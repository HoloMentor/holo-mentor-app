import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

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

export default function AddStudent({}: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
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
                    name="registrationNumber"
                />
            </ModalBody>
            <ModalFooter>
                <SubmitButton type="submit">Add</SubmitButton>
            </ModalFooter>
        </Form>
    );
}
