import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import instituteServices from '@/redux/services/institute.service';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
    name: '',
    city: '',
    address: '',
    registrationNumber: '',
    establishedDate: '',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: ''
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Institute name is required'),
    city: Yup.string().required('Institute city is required'),
    address: Yup.string().required('Institute address is required'),
    registrationNumber: Yup.string().required('Registration number is required'),
    establishedDate: Yup.date().required('Established date is required'),
    adminFirstName: Yup.string().required('Admin first name is required'),
    adminLastName: Yup.string().required('Admin last name is required'),
    adminEmail: Yup.string().email('Invalid email').required('Admin email is required')
});

export default function AddInstitute({}: ModelContainerProps) {
    const dispatch = useDispatch();

    const [
        createInstitute,
        { isLoading: isCreating, isError: isInstituteCreateError, error: instituteCreateError }
    ] = instituteServices.useCreateMutation();
    useErrorHandler(isInstituteCreateError, instituteCreateError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createInstitute(values);

        if (result?.data?.status === 201 || result?.data?.status === 200) {
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: 'Mail Send Success'
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
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green">
                Add New Institute
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <p className="font-semibold">Institute Details</p>
                <FormInput label="Name" placeholder="Name" name="name" isRequired />
                <FormInput label="City" placeholder="City" name="city" isRequired />
                <FormInput label="Address" placeholder="Address" name="address" isRequired />

                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        label="Registration Number"
                        placeholder="Registration Number"
                        name="registrationNumber"
                        isRequired
                    />
                    <FormInput
                        label="Established Date"
                        placeholder="Established Date"
                        name="establishedDate"
                        type="date"
                        isRequired
                    />
                </div>

                <p className="font-semibold">Admin Details</p>
                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        label="First Name"
                        placeholder="First Name"
                        name="adminFirstName"
                        isRequired
                    />
                    <FormInput
                        label="Last Name"
                        placeholder="Last Name"
                        name="adminLastName"
                        isRequired
                    />
                </div>
                <FormInput
                    label="Admin Email"
                    placeholder="Admin Email"
                    name="adminEmail"
                    type="email"
                    isRequired
                />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isCreating} type="submit" form="form">
                    Create
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
