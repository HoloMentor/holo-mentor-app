import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormEditor from '@/components/form/editor';
import FormInput from '@/components/form/input.tsx';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import studyPlanTaskServices from '@/redux/services/study-plan/tasks.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Task title is required'),
    description: Yup.mixed().required('Task description is required')
});

export default function EditStudyPlanTask({ id, title, description }: ModelContainerProps) {
    const dispatch = useDispatch();

    const [updateTask, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
        studyPlanTaskServices.useUpdateMutation();
    useErrorHandler(isUpdateError, updateError);

    const initialValues = useMemo(() => {
        const template = {
            title: '',
            description: ''
        };

        if (title) template.title = title;
        if (description) template.description = description;

        return template;
    }, [title, description]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateTask({
            id: id,
            title: values.title,
            description: values.description
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
                Edit Task
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput name="title" label="Task Title" placeholder="Task Title" isRequired />
                <FormEditor
                    className="min-h-72"
                    name="description"
                    label="Task Description"
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
