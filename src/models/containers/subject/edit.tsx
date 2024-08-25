import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import FormInput from '@/components/form/input.tsx';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import subjectServices from '@/redux/services/subject.service.ts';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { useDispatch } from 'react-redux';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { useMemo } from 'react';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Subject name is required')
});

export default function EditSubject({ data }: ModelContainerProps) {
    const dispatch = useDispatch();

    // query
    const {
        data: subject,
        isError: isSubjectError,
        error: subjectError,
        isLoading: isSubjectLoading
    } = subjectServices.useGetQuery(
        {
            id: data.id
        },
        {
            skip: !data.id
        }
    );
    useErrorHandler(isSubjectError, subjectError);

    // mutation
    const [
        updateSubject,
        { isLoading: isSubjectUpdating, isError: isSubjectUpdateError, error: subjectUpdateError }
    ] = subjectServices.useUpdateMutation();
    useErrorHandler(isSubjectUpdateError, subjectUpdateError);

    const initialValues = useMemo(() => {
        const template = {
            name: ''
        };

        if (subject?.data) {
            if (subject.data.name) template.name = subject.data.name;
        }

        return template;
    }, [subject]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateSubject({
            id: data.id,
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
            isLoading={isSubjectLoading}
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Edit a Subject
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput label="Subject name" placeholder="Subject name" name="name" isRequired />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isSubjectUpdating} type="submit">
                    Save
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
