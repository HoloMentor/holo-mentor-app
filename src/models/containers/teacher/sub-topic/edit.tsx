import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormInput from '@/components/form/input.tsx';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import classSubTopicServices from '@/redux/services/class/subtopics.service';
import classTopicServices from '@/redux/services/class/topics.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Sub topic is required')
});

export default function EditSubTopic({ topicId, name }: ModelContainerProps) {
    const dispatch = useDispatch();

    const [
        updateSubTopic,
        { isLoading: isUpdating, isError: isUpdateTopicError, error: updateTopicError }
    ] = classSubTopicServices.useUpdateMutation();
    useErrorHandler(isUpdateTopicError, updateTopicError);

    const initialValues = useMemo(() => {
        const template = {
            name: ''
        };

        if (name) template.name = name;

        return template;
    }, [name]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateSubTopic({
            id: topicId,
            name: values.name
        });

        if (result?.data?.status === 200) {
            dispatch(classTopicServices.util.invalidateTags(['ClassTopics']));
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
                Edit Sub Topic
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput
                    label="Sub Topic"
                    placeholder="Eg: Quantum theory"
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
