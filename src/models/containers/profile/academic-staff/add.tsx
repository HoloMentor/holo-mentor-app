import Button from '@/components/button';
import Form from '@/components/form';
import FormInput from '@/components/form/input';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';

const initialValues = {
    email: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
});

export default function AddAcademicStaff({}: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Add Supporting Staff Member
            </ModalHeader>
            <ModalBody>
                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4 ">
                    <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1">
                        <FormInput label="Email *" placeholder="Email" name="email" />
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form="form">
                    Add
                </Button>
            </ModalFooter>
        </div>
    );
}
