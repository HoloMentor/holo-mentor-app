import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    email: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
});

export default function AddInstitute({}: ModelContainerProps) {
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
                Add New Institute
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput label="Name" placeholder="Name" name="name" />
                <FormInput label="Email" placeholder="Email" name="email" type="email" />
                <FormInput label="City" placeholder="City" name="city" />
                <FormInput label="Address" placeholder="Address" name="address" />

                <div className="grid grid-cols-2 gap-3">
                    <FormInput label="Registration Number" placeholder="City" name="city" />
                    <FormInput
                        label="Established Date"
                        placeholder="Established Date"
                        name="established_date"
                        type="date"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <SubmitButton type="submit" form="form">
                    Create
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
