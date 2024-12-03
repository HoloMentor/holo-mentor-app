import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import Reader from '@/components/editor/reader';
import fileServices from '@/redux/services/file.service';
import { modelNames } from '@/models';
import studyPlanTaskServices from '@/redux/services/study-plan/tasks.service';
import { IRootState } from '@/redux';
import { useParams } from 'react-router-dom';

interface TaskViewProps {
    task: {
        id: number;
        title: string;
        description: any;
    };
    // materials: Array<{ id: string; url: string; name: string }>;
    // setMaterials: (materials: Array<{ id: string; url: string; name: string }>) => void;
    // onSubmit: (taskId: string) => void;
}

export default function TaskView({ task }: TaskViewProps) {
    const dispatch = useDispatch();
    const [upload] = fileServices.useUploadMutation();

    const { user } = useSelector((state: IRootState) => state.user);
    const { subjectId, studyPlanId } = useParams();
    const classId = subjectId;

    const [materials, setMaterials] = useState<Array<{ id: string; url: string; name: string }>>(
        []
    );

    // get submitted materials
    const { data: submittedMaterials } = studyPlanTaskServices.useGetSubmittedMaterialsQuery({
        userId: user.userId,
        classId,
        studyPlanId,
        taskId: task.id.toString()
    });

    useEffect(() => {
        if (submittedMaterials?.data?.submission) {
            setMaterials(submittedMaterials.data.submission);
        }
    }, [submittedMaterials]);

    const [submitTask] = studyPlanTaskServices.useSubmitTaskMutation();

    // handle submission
    // get taskId from the task
    // const handleSubmit = async () => {
    const handleSubmit = async (taskId: string) => {
        try {
            console.log(user.userId, classId, studyPlanId, taskId, materials);
            await submitTask({
                userId: user.userId,
                classId,
                studyPlanId,
                taskId,
                materials
            });

            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: 'Submission successful'
                })
            );
        } catch (err) {
            dispatch(
                notifyActions.open({
                    type: 'error',
                    message: 'Submission failed'
                })
            );
        }
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const form = new FormData();
            const file = e.target.files[0];
            const fileName = file.name;

            form.append('fileName', fileName);
            form.append('file', file);

            try {
                const result = await upload(form);

                if (result.data?.data?.url) {
                    dispatch(
                        notifyActions.open({
                            type: 'success',
                            message: 'File uploaded successfully'
                        })
                    );

                    setMaterials([
                        ...materials,
                        {
                            id: Date.now().toString(),
                            url: result.data.data.url,
                            name: fileName
                        }
                    ]);

                    console.log(materials, 'materials');
                }
            } catch (error) {
                dispatch(
                    notifyActions.open({
                        type: 'error',
                        message: 'Error uploading file'
                    })
                );
            }
        }
    };

    return (
        <>
            <Reader value={task.description} />

            <div className="grid grid-cols-5 gap-4 gap-y-10 max-2xl:grid-cols-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {materials.map((material, j) => (
                    <div key={`material-${material.id}`} className="flex flex-col items-center">
                        <span
                            onClick={() =>
                                material.id &&
                                dispatch(
                                    modelActions.show({
                                        name: modelNames.DELETE_MATERIAL,
                                        props: { id: material.id }
                                    })
                                )
                            }
                            className="flex justify-end cursor-pointer max-w-24 w-full">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_131_12585)">
                                    <rect width="15" height="15" rx="7.5" fill="#FF0E00" />
                                    <path
                                        d="M10.5524 6.76V8.53H4.19244V6.76H10.5524Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_131_12585">
                                        <rect width="15" height="15" rx="7.5" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                        <a
                            title={'Subject Name'}
                            key={`material-${material.id}`}
                            href={material.url}
                            className="flex flex-col items-center gap-2 text-dark-gray">
                            <img
                                src={`/images/subjects/pdf.svg`}
                                alt="PDF Material"
                                className="size-20"
                            />
                            <span className="block break-all text-xs">{material.name}</span>
                        </a>
                    </div>
                ))}
            </div>

            <div className="flex justify-center w-full p-2">
                <Button
                    variant="bordered"
                    className="border-2 border-gray-200 p-6 border-dashed max-w-full w-full"
                    onClick={() => document.getElementById(`file-${task.id}`)?.click()}>
                    <input
                        type="file"
                        id={`file-${task.id}`}
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx"
                    />
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 13.75V20M20 20V26.25M20 20H26.25M20 20H13.75M38.75 20C38.75 22.4623 38.265 24.9005 37.3227 27.1753C36.3805 29.4502 34.9993 31.5172 33.2583 33.2583C31.5172 34.9993 29.4502 36.3805 27.1753 37.3227C24.9005 38.265 22.4623 38.75 20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2583C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 15.0272 3.22544 10.2581 6.74175 6.74175C10.2581 3.22544 15.0272 1.25 20 1.25C24.9728 1.25 29.7419 3.22544 33.2583 6.74175C36.7746 10.2581 38.75 15.0272 38.75 20Z"
                            stroke="#6A6A6A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <p className="text-slate-400">Upload Submission</p>
                </Button>
            </div>

            <Button
                color="primary"
                onClick={handleSubmit.bind(this, task.id.toString())}
                disabled={materials.length === 0}>
                Submit
            </Button>
        </>
    );
}
