import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import teacherServices from '@/redux/services/teacher.service'; // Ensure you have this service
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import moment from 'moment';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    registrationNumber: Yup.string().required('Registration number is required')
});

export default function EditTeacher({ data }: ModelContainerProps) {
    const dispatch = useDispatch();

    // mutations
    const [
        updateTeacher,
        { isLoading: isUpdating, isError: isTeacherUpdateError, error: teacherUpdateError }
    ] = teacherServices.useUpdateMutation(); // Assuming you have this mutation in the teacher service
    useErrorHandler(isTeacherUpdateError, teacherUpdateError);

    // query
    const {
        data: teacher,
        isError: isTeacherError,
        error: teacherError,
        isLoading: isTeacherLoading
    } = teacherServices.useGetQuery(
        {
            id: data.id
        },
        {
            skip: !data.id
        }
    );
    useErrorHandler(isTeacherError, teacherError);

    const initialValues = useMemo(() => {
        const template = {
            firstName: '',
            lastName: '',
            email: '',
            registrationNumber: ''
        };

        if (teacher?.data) {
            if (teacher.data.firstName) template.firstName = teacher.data.firstName;
            if (teacher.data.lastName) template.lastName = teacher.data.lastName;
            if (teacher.data.email) template.email = teacher.data.email;
            if (teacher.data.registrationNumber)
                template.registrationNumber = teacher.data.registrationNumber;
        }

        return template;
    }, [teacher]);

    const onSubmit = async (values: FormikValues) => {
        const result = await updateTeacher({ id: data.id, ...values });

        if (result?.data?.status === 200) {
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: result.data.message
                })
            );

            dispatch(modelActions.hide());
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                Edit Teacher
            </ModalHeader>
            <Form
                isLoading={isTeacherLoading}
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                className="flex flex-col gap-4">
                <ModalBody className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <FormInput
                            label="First Name"
                            placeholder="First Name"
                            name="firstName"
                            isRequired
                        />
                        <FormInput
                            label="Last Name"
                            placeholder="Last Name"
                            name="lastName"
                            isRequired
                        />
                    </div>
                    <FormInput
                        label="Email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        isRequired
                    />
                    <FormInput
                        label="Registration Number"
                        placeholder="Registration Number"
                        name="registrationNumber"
                        isRequired
                    />
                </ModalBody>
                <ModalFooter>
                    <SubmitButton isLoading={isUpdating} type="submit" form="form">
                        Save
                    </SubmitButton>
                </ModalFooter>
            </Form>
        </div>
    );
}
