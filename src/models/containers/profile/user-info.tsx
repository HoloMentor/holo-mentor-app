import Button from '@/components/button';
import Form from '@/components/form';
import FormInput from '@/components/form/input';
import Select, { SelectValue } from '@/components/select';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';

const initialValues = {
    firstName: '',
    lastName: ''
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required')
});

const roleOptions = [
    {
        value: 'student',
        label: 'Student'
    },
    {
        value: 'teacher',
        label: 'Teacher'
    }
];

export default function ProfileUserInfo({ onClose }: ModelContainerProps) {
    const [roleValue, setRoleValue] = useState<SelectValue>('student');
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };
    return (
        <div>
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Personal Information
            </ModalHeader>
            <ModalBody>
                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1">
                        <FormInput label="First Name *" placeholder="First Name" name="firstName" />
                        <FormInput label="Last Name *" placeholder="Last Name" name="lastName" />
                        <Select
                            label="Role"
                            options={roleOptions}
                            value={roleValue}
                            onChange={setRoleValue}
                            className="border-[#0000001A] border-2 rounded-md"
                        />
                    </div>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button type="submit" form="form">
                    Save
                </Button>
            </ModalFooter>
        </div>
    );
}
