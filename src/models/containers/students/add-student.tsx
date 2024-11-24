import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import studentServices from '@/redux/services/student.service.ts';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import useErrorHandler from '@/hooks/error-handler.tsx';

interface AddStudentFormValues {
    firstName: string;
    lastName: string;
    email: string;
    registrationNo: string;
}

const initialValues: AddStudentFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    registrationNo: ''
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    registrationNo: Yup.string().required('Registration number is required')
});

export default function AddStudent({}: ModelContainerProps) {
    const dispatch = useDispatch();

    const user = useSelector((state: IRootState) => state.user.user);

    const [createStudent, { isLoading: isStudentCreating, error: studentCreateError }] =
        studentServices.useCreateMutation();

    useErrorHandler(Boolean(studentCreateError), studentCreateError);

    const onSubmit = async (values: AddStudentFormValues) => {
        const url = window.location.pathname;
        const classId = url.split('/')[2];

        try {
            const result = await createStudent({
                instituteId: user.instituteId,
                classId: classId,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                registrationNo: values.registrationNo
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
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    };

    return (
        <Form
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Add a Student
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
                    name="registrationNo" // Updated field name
                />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isStudentCreating} type="submit">
                    Add
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
