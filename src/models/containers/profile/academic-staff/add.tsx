import { Formik, Form as FormikForm, FormikValues } from 'formik';
import * as Yup from 'yup';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import FormInput from '@/components/form/input';
import SubmitButton from '@/components/form/button';
import { useCreateStaffMutation } from '@/redux/services/staff.service';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';

const initialValues = {
    email: '',
    firstName: '',
    lastName: ''
};

// Validation schema remains the same
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
});

export default function AddAcademicStaff() {
    const [createStaff, { isLoading, isSuccess, isError, error }] = useCreateStaffMutation();
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
    const { user } = useSelector((state: IRootState) => state.user);

    const onSubmit = async (values: FormikValues) => {
        const payload = {
            ...values,
            instituteId: user.instituteId,
            teacherId: user.userId,
            teacherInstituteId: user.instituteId
        };
        console.log('Payload:', payload);
        try {
            await createStaff(payload).unwrap();
            setSubmissionStatus('*Staff member added successfully!');
        } catch (err) {
            console.error(err);
            setSubmissionStatus('*Failed to add staff member. Please try again.');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {() => (
                <div>
                    <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                        Add Supporting Staff Member
                    </ModalHeader>
                    <ModalBody>
                        <FormikForm className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1">
                                <FormInput
                                    label="First Name *"
                                    placeholder="First Name"
                                    name="firstName"
                                />
                                <FormInput
                                    label="Last Name *"
                                    placeholder="Last Name"
                                    name="lastName"
                                />
                                <FormInput label="Email *" placeholder="Email" name="email" />
                            </div>
                        </FormikForm>
                        {submissionStatus && <p>{submissionStatus}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <SubmitButton isLoading={isLoading}>Add</SubmitButton>
                    </ModalFooter>
                </div>
            )}
        </Formik>
    );
}
