import Reader from '@/components/editor/reader';
import Heading from '@/components/headings/main';
import useErrorHandler from '@/hooks/error-handler';
import { modelNames } from '@/models';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import fileServices from '@/redux/services/file.service';
import studyPlanTaskServices from '@/redux/services/study-plan/tasks.service';
import { Accordion, AccordionItem, Button, Skeleton, Tooltip } from '@nextui-org/react';
import { u } from 'framer-motion/client';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StudyPlanIndividual() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const { subjectId, studyPlanId } = useParams();
    // let { classId } = useParams<{ classId: string }>();
    // const { subjectId } = useParams<{ subjectId: string }>();

    const classId = subjectId;

    // if subjectId is available and classId is not, set classId to subjectId
    // if (subjectId && !classId) classId = subjectId;

    const [uploadingTaskId, setUploadingTaskId] = useState<string | null>(null);

    const {
        data: studyPlanTasks,
        isError: isStudyPlanTasksError,
        error: studyPlanTasksError,
        isLoading: isStudyPlanTasksLoading
    } = studyPlanTaskServices.useGetTierStudyPlanTasksQuery(
        {
            classId,
            studyPlanId
        },
        {
            skip: !classId || !studyPlanId
        }
    );
    useErrorHandler(isStudyPlanTasksError, studyPlanTasksError);

    const [upload, { isError: isUploadError, error: uploadError, isLoading: isUploading }] =
        fileServices.useUploadMutation();
    useErrorHandler(isUploadError, uploadError);

    const [materials, setMaterials] = useState<Array<{ id: string; url: string; name: string }>>(
        []
    );

    const handleFileUpload = async (
        e: ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string) => void
    ) => {
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

                    console.log(result.data.data.url);
                    console.log(fileName);

                    setMaterials((prev) => [
                        ...prev,
                        {
                            id: Date.now().toString(), // temporary ID
                            url: result.data.data.url,
                            name: fileName
                        }
                    ]);
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

    return (
        <div className="flex flex-col gap-3">
            <Heading>Study Plan Tasks</Heading>

            <div className="py-6 mb-4 bg-white rounded-md">
                <Accordion variant="splitted" selectionMode="multiple">
                    {isStudyPlanTasksLoading
                        ? Array.from({ length: 4 }).map((_, i) => {
                              return (
                                  <AccordionItem
                                      key={`task-${i}`}
                                      aria-label={`Accordion ${i}`}
                                      title={
                                          <div className="flex items-center gap-4">
                                              <Skeleton className="max-w-52 w-full h-7 rounded-md"></Skeleton>
                                          </div>
                                      }
                                      className="!shadow-none border border-light-border rounded-lg p-4 py-4"
                                      classNames={{
                                          content: 'flex flex-col gap-4'
                                      }}>
                                      <Skeleton className="max-w-[60%] w-full h-4 rounded-md"></Skeleton>
                                      <Skeleton className="max-w-[52%] w-full h-4 rounded-md"></Skeleton>
                                      <Skeleton className="max-w-[70%] w-full h-4 rounded-md"></Skeleton>
                                  </AccordionItem>
                              );
                          })
                        : studyPlanTasks?.data?.map(
                              (_: { id: number; title: string; description: any }) => {
                                  function setFieldValue(field: string, value: string): void {
                                      throw new Error('Function not implemented.');
                                  }

                                  return (
                                      <AccordionItem
                                          key={`task-${_.id}`}
                                          aria-label={`Accordion ${_.id}`}
                                          title={
                                              <div className="flex items-center gap-4">
                                                  <p className="text-xl font-semibold">{_.title}</p>
                                              </div>
                                          }
                                          className="!shadow-none border border-light-border rounded-lg p-4 py-4"
                                          classNames={{
                                              content: 'flex flex-col gap-4'
                                          }}>
                                          <Reader value={_.description} />

                                          <div className="grid grid-cols-5 gap-4 gap-y-10 max-2xl:grid-cols-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                                              {materials.map((material, j) => (
                                                  <div
                                                      key={`material-${material.id}`}
                                                      className="flex flex-col items-center">
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
                                                                  <rect
                                                                      width="15"
                                                                      height="15"
                                                                      rx="7.5"
                                                                      fill="#FF0E00"
                                                                  />
                                                                  <path
                                                                      d="M10.5524 6.76V8.53H4.19244V6.76H10.5524Z"
                                                                      fill="black"
                                                                  />
                                                              </g>
                                                              <defs>
                                                                  <clipPath id="clip0_131_12585">
                                                                      <rect
                                                                          width="15"
                                                                          height="15"
                                                                          rx="7.5"
                                                                          fill="white"
                                                                      />
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
                                                          <span className="block break-all text-xs">
                                                              {material.name}
                                                          </span>
                                                      </a>
                                                  </div>
                                              ))}
                                          </div>

                                          <div className="flex justify-center w-full p-2">
                                              <Button
                                                  variant="bordered"
                                                  className="border-2 border-gray-200 p-6 border-dashed max-w-full w-full"
                                                  //   onClick={() =>
                                                  //       dispatch(
                                                  //           modelActions.show({
                                                  //               name: modelNames.ADD_STUDY_PLAN_TASK,
                                                  //               props: { classId, studyPlanId }
                                                  //           })
                                                  //       )
                                                  //   }
                                                  onClick={() =>
                                                      document
                                                          .getElementById(`file-${_.id.toString()}`)
                                                          ?.click()
                                                  }>
                                                  <input
                                                      type="file"
                                                      id={`file-${_.id}`}
                                                      className="hidden"
                                                      onChange={(e) =>
                                                          handleFileUpload(e, setFieldValue)
                                                      }
                                                      //   onChange={(e) =>
                                                      //       handleFileUpload(e, _.id.toString())
                                                      //   }
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

                                                  <p className="text-slate-400">
                                                      {uploadingTaskId === _.id.toString()
                                                          ? 'Uploading...'
                                                          : 'Upload Submission'}
                                                  </p>
                                              </Button>
                                          </div>

                                          {/* <div className="flex items-center gap-3 justify-end">
                                              <input
                                                  type="file"
                                                  id={`file-${_.id}`}
                                                  className="hidden"
                                                  onChange={(e) =>
                                                      handleFileUpload(e, _.id.toString())
                                                  }
                                                  accept=".pdf,.doc,.docx"
                                              />
                                              <Button
                                                  isLoading={uploadingTaskId === _.id.toString()}
                                                  onClick={() =>
                                                      document
                                                          .getElementById(`file-${_.id.toString()}`)
                                                          ?.click()
                                                  }
                                                  color="primary">
                                                  {uploadingTaskId === _.id.toString()
                                                      ? 'Uploading...'
                                                      : 'Upload Submission'}
                                              </Button>
                                          </div> */}

                                          <Button
                                              color="primary"
                                              onClick={handleSubmit.bind(this, _.id.toString())}
                                              disabled={materials.length === 0}>
                                              Submit
                                          </Button>

                                          {/* <div className="flex items-center gap-3 justify-end">
                                              <Tooltip content="Delete Task" placement="bottom">
                                                  <Button
                                                      isIconOnly
                                                      variant="light"
                                                      className="text-danger"
                                                      onClick={() =>
                                                          dispatch(
                                                              modelActions.show({
                                                                  name: modelNames.DELETE_STUDY_PLAN_TASK,
                                                                  props: { id: _.id }
                                                              })
                                                          )
                                                      }>
                                                      <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 24 24"
                                                          fill="currentColor"
                                                          className="size-5">
                                                          <path
                                                              fillRule="evenodd"
                                                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                              clipRule="evenodd"
                                                          />
                                                      </svg>
                                                  </Button>
                                              </Tooltip>
                                              <Tooltip content="Edit Task" placement="bottom">
                                                  <Button
                                                      isIconOnly
                                                      variant="light"
                                                      className="text-dark-green"
                                                      onClick={() =>
                                                          dispatch(
                                                              modelActions.show({
                                                                  name: modelNames.EDIT_STUDY_PLAN_TASK,
                                                                  props: _
                                                              })
                                                          )
                                                      }>
                                                      <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 24 24"
                                                          fill="currentColor"
                                                          className="size-5">
                                                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                      </svg>
                                                  </Button>
                                              </Tooltip>
                                          </div> */}
                                      </AccordionItem>
                                  );
                              }
                          )}
                </Accordion>
                {/* <div className="flex justify-center w-full p-2">
                    <Button
                        variant="bordered"
                        className="border-2 border-gray-200 p-6 border-dashed max-w-full w-full"
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_STUDY_PLAN_TASK,
                                    props: { classId, studyPlanId }
                                })
                            )
                        }>
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

                        <p className="text-slate-400">Add New Task</p>
                    </Button>
                </div> */}
            </div>
        </div>
    );
}
