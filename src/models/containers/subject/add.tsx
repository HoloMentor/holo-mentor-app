import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormInput from '@/components/form/input.tsx';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import subjectServices from '@/redux/services/subject.service.ts';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import { modelActions } from '@/redux/reducers/model.reducer.ts';

const initialValues = {
    name: ''
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Subject name is required')
});

export default function AddSubject({}: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [
        createSubject,
        { isLoading: isSubjectCreating, isError: isSubjectCreateError, error: subjectCreateError }
    ] = subjectServices.useCreateMutation();
    useErrorHandler(isSubjectCreateError, subjectCreateError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createSubject({
            instituteId: user.instituteId,
            name: values.name
        });

        if (result?.data?.status === 201) {
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
            className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Add a Subject
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput label="Subject name" placeholder="Subject name" name="name" isRequired />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isSubjectCreating} type="submit">
                    Add
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
