import Button from '@/components/button';
import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import FormUpload from '@/components/form/upload';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import studyPlanServices from '@/redux/services/study-plan/study-plan.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    const [
        createTiers,
        { isError: isCreateTiersError, error: createTiersError, isLoading: isLoading }
    ] = studyPlanServices.useCreateTiersMutation();
    useErrorHandler(isCreateTiersError, createTiersError);

    const onSubmit = async (v: FormikValues) => {
        const form = new FormData();

        form.append('class_id', classId);
        form.append('marks_out_of', v.marksOutOf);
        form.append('file', v.file);

        const result = await createTiers(form);

        if (result?.data?.status === 200) {
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: result.data.message
                })
            );

            dispatch(modelActions.hide());
        }
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
            <ModalBody className="flex flex-col gap-4">
                <FormUpload
                    name="file"
                    accept=".csv"
                    text="Upload Students Marks CSV Sheet"
                    preview="name"
                />

                <FormInput name="marksOutOf" label="Marks Out Of" min={0} />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isLoading} type="submit" form="form">
                    Upload
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
