import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormEditor from '@/components/form/editor';
import FormInput from '@/components/form/input.tsx';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import classTopicServices from '@/redux/services/class/topics.service';
import studyPlanTaskServices from '@/redux/services/study-plan/tasks.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
    title: '',
    description: ''
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Task title is required'),
    description: Yup.mixed().required('Task description is required')
});

export default function AddNewStudyPlanTask({ classId, studyPlanId }: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [
        createTask,
        { isLoading: isCreating, isError: isCreateTopicError, error: createTopicError }
    ] = studyPlanTaskServices.useCreateMutation();
    useErrorHandler(isCreateTopicError, createTopicError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createTask({
            classId: classId,
            studyPlanId: studyPlanId,
            instituteId: user.instituteId,
            title: values.title,
            description: values.description
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
                Add New Task
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
                <SubmitButton isLoading={isCreating} type="submit">
                    Add
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
