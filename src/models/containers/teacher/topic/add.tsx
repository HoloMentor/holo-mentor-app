import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormInput from '@/components/form/input.tsx';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import classTopicServices from '@/redux/services/class/topics.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
    name: ''
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Topic is required')
});

export default function AddNewTopic({ classId }: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [
        createTopic,
        { isLoading: isCreating, isError: isCreateTopicError, error: createTopicError }
    ] = classTopicServices.useCreateMutation();
    useErrorHandler(isCreateTopicError, createTopicError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createTopic({
            classId: classId,
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
                Add New Topic
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput
                    label="Topic"
                    placeholder="Eg: Quantum mechanics"
                    name="name"
                    isRequired
                />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isCreating} type="submit">
                    Add
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
