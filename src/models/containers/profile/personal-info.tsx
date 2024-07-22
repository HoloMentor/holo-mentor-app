import Button from '@/components/button';
import Form from '@/components/form';
import FormInput from '@/components/form/input';
import FormAutoComplete from '@/components/form/autocomplete';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';

const initialValues = {
    firstName: '',
    lastName: ''
};

const countryOptions = [
    { value: 'Sri Lanka', label: 'Sri Lanka' },
    { value: 'USA', label: 'USA' },
    { value: 'Canada', label: 'Canada' },
    { value: 'India', label: 'India' },
    { value: 'Australia', label: 'Australia' },
    { value: 'UK', label: 'UK' }
];

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    country: Yup.string().required('Country is required'),
    countryCode: Yup.string().required('Country Code is required'),
    contactNumber: Yup.number().required('Contact Number is required')
});

export default function ProfilePersonalInfo({ onClose }: ModelContainerProps) {
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
                        <FormInput label="Email *" placeholder="Email" name="email" />
                        <FormAutoComplete
                            name="country"
                            label="Country *"
                            placeholder="Select Country"
                            defaultItems={countryOptions}
                        />
                        <label className="text-sm">Contact Number *</label>
                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-2">
                                <FormInput name="countryCode" placeholder="+94" type="text" />
                            </div>
                            <div className="col-span-5">
                                <FormInput
                                    placeholder="Contact Number"
                                    name="contactNumber"
                                    type="number"
                                />
                            </div>
                        </div>
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
