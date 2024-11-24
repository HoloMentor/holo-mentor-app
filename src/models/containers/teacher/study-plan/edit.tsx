import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormInput from '@/components/form/input.tsx';
import FormTextarea from '@/components/form/textarea';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import studyPlanServices from '@/redux/services/study-plan/study-plan.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    description: Yup.mixed().required('description is required')
});

export default function EditStudyPlan({ id, name, description }: ModelContainerProps) {
    const dispatch = useDispatch();

    const [updatePlan, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
        studyPlanServices.useUpdateMutation();
    useErrorHandler(isUpdateError, updateError);

    const initialValues = useMemo(() => {
        const template = {
            name: '',
            description: ''
        };

        if (name) template.name = name;
        if (description) template.description = description;

        return template;
    }, [name, description]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updatePlan({
            id: id,
            name: values.name,
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
                Edit Study Plan
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput name="name" label="Name" placeholder="Name" isRequired />
                <FormTextarea name="description" label="Description" minRows={7} isRequired />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isUpdating} type="submit">
                    Save
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
