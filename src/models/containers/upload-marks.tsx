import Button from '@/components/button';
import Form from '@/components/form';
import FormUpload from '@/components/form/upload';
import useErrorHandler from '@/hooks/error-handler';
import studyPlanServices from '@/redux/services/study-plan.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    marksOutOf: 100,
    file: ''
};

const validationSchema = Yup.object().shape({
    marksOutOf: Yup.number().min(0).required('Marks out of is required'),
    file: Yup.mixed().required('File is required')
});

export default function UploadMarks({ classId, onClose }: ModelContainerProps) {
    const [
        createTiers,
        { isError: isCreateTiersError, error: createTiersError, isLoading: isLoading }
    ] = studyPlanServices.useCreateTiersMutation();
    useErrorHandler(isCreateTiersError, createTiersError);

    const onSubmit = async (v: FormikValues) => {
        console.log(v);
        const form = new FormData();
        console.log(classId);
        form.append('class_id', classId);
        form.append('marks_out_of', classId);
        console.log(v?.file);

        // const result = await createTiers(form);
    };

    return (
        <Form
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            className="flex flex-col gap-4 w-6xl">
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green w-6xl">
                Upload Student Marks
            </ModalHeader>
            <ModalBody>
                <FormUpload
                    name="file"
                    accept=".csv"
                    text="Upload Students Marks CSV Sheet"
                    preview="name"
                />

                {/* <label
                    className={`p-4 rounded-md border-2 border-dashed cursor-pointer transition-all relative h-44 ${
                        dragOver ? 'border-success' : 'border-gray-400'
                    }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}>
                    <input type="file" hidden />
                    {dragOver ? (
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex flex-col items-center justify-center gap-3 p-4 text-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                                />
                            </svg>
                            <p>Drop your file here.</p>
                        </div>
                    ) : file ? (
                        <div className="flex flex-col items-center justify-center gap-3 p-4 text-success">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                                />
                            </svg>

                            <p>{file?.name}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 p-4 text-slate-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-12">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                />
                            </svg>

                            <a>Upload CSV file</a>
                            <span className="text-sm">(only .csv files are accepted)</span>
                        </div>
                    )}
                </label> */}
            </ModalBody>
            <ModalFooter>
                <Button isLoading={isLoading} onClick={onSubmit} type="submit" form="form">
                    Upload
                </Button>
            </ModalFooter>
        </Form>
    );
}
