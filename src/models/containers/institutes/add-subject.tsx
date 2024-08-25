import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    subjectName: '',
};

const validationSchema = Yup.object().shape({
    subjectName: Yup.string().required('Subject name is required'),
});

export default function AddSubjects({}: ModelContainerProps) {
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
                Add a Subject
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">        
                <FormInput label="Subject Name" placeholder="Subject Name" name="subjectName" />
            </ModalBody>
            <ModalFooter>
                <SubmitButton type="submit">Add</SubmitButton>
            </ModalFooter>
        </Form>
    );
}
