import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import teacherServices from '@/redux/services/teacher.service.ts';
import useErrorHandler from '@/hooks/error-handler.tsx';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    registrationNumber: ''
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    registrationNumber: Yup.string().required('Registration number is required')
});

export default function AddTeacher() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [
        createTeacher,
        { isLoading: isTeacherCreating, isError: isTeacherCreateError, error: teacherCreateError }
    ] = teacherServices.useCreateMutation();
    useErrorHandler(isTeacherCreateError, teacherCreateError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createTeacher({
            instituteId: user.instituteId,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            registrationNumber: values.registrationNumber
        });

        if (result?.data?.status === 201 || result?.data?.status === 200) {
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
                Add a Teacher
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    <FormInput label="First Name" placeholder="First Name" name="firstName" />
                    <FormInput label="Last Name" placeholder="Last Name" name="lastName" />
                </div>
                <FormInput label="Email" placeholder="Email" name="email" type="email" />
                <FormInput
                    label="Registration Number"
                    placeholder="Registration Number"
                    name="registrationNumber"
                />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isTeacherCreating} type="submit">
                    Add
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
