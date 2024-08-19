import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import FormUpload from '@/components/form/upload';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    file: ''
};

const validationSchema = Yup.object().shape({
    file: Yup.string().required('First name is required')
});

export default function AddStudents({}: ModelContainerProps) {
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
                Upload Students
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormUpload name="file" text="CSV file only" accept=".csv" />
            </ModalBody>
            <ModalFooter>
                <SubmitButton type="submit">Add</SubmitButton>
            </ModalFooter>
        </Form>
    );
}
