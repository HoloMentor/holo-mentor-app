import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormInput from '@/components/form/input.tsx';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import classTopicServices from '@/redux/services/class/topics.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Topic is required')
});

export default function EditTopic({ topicId, name }: ModelContainerProps) {
    const dispatch = useDispatch();
    const [
        updateTopic,
        { isLoading: isUpdating, isError: isUpdateTopicError, error: updateTopicError }
    ] = classTopicServices.useUpdateMutation();
    useErrorHandler(isUpdateTopicError, updateTopicError);

    const initialValues = useMemo(() => {
        const template = {
            name: ''
        };

        if (name) template.name = name;

        return template;
    }, [name]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateTopic({
            id: topicId,
            name: values.name
        });

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
            className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Edit Topic
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
                <SubmitButton isLoading={isUpdating} type="submit">
                    Save
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
