import Form from '@/components/form';
import SubmitButton from '@/components/form/button';
import FormInput from '@/components/form/input';
import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import { userActions } from '@/redux/reducers/user.reducer';
import fileServices from '@/redux/services/file.service';
import userServices from '@/redux/services/user.service';
import { Avatar, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required')
});

export default function ProfileUserInfo({}: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const [profileImage, setProfileImage] = useState<string>(user.image || '');

    const [upload, { isError: isUploadError, error: uploadError, isLoading: isUploading }] =
        fileServices.useUploadMutation();
    useErrorHandler(isUploadError, uploadError);

    const [update, { isError: isUpdateError, error: updateError, isLoading: isUpdating }] =
        userServices.useUpdateUserMutation();
    useErrorHandler(isUpdateError, updateError);

    const initialValues = useMemo(() => {
        const template = {
            firstName: '',
            lastName: ''
        };

        if (user.firstName) template.firstName = user.firstName;
        if (user.lastName) template.lastName = user.lastName;

        return template;
    }, [user]);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const form = new FormData();
            const file = e.target.files[0];
            const fileName = file.name;

            form.append('fileName', fileName);
            form.append('file', file);
            const result = await upload(form);

            if (result.data?.data?.url) {
                setProfileImage(result.data.data.url);
            }
        }
    };

    const onSubmit = async (values: FormikValues) => {
        const result = await update({
            id: user.userId,
            image: profileImage,
            ...values
        });

        if (result?.data?.status === 200) {
            dispatch(
                userActions.set({
                    ...user,
                    image: profileImage,
                    firstName: values.firstName,
                    lastName: values.lastName
                })
            );

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
        <Form
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            className="flex flex-col gap-4">
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl">
                User Information
            </ModalHeader>

            <ModalBody className="flex flex-col gap-4">
                <div className="flex justify-center mt-4">
                    <div className="relative">
                        <Avatar
                            src={profileImage}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover"
                        />
                        <label
                            htmlFor="file-input"
                            className={`absolute inset-0 flex justify-center items-center rounded-full cursor-pointer ${
                                !profileImage ? 'bg-black bg-opacity-50' : ''
                            }`}>
                            {!profileImage && (
                                <svg
                                    width="39"
                                    height="35"
                                    viewBox="0 0 39 35"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.5 24.667C22.4685 24.667 24.875 22.2605 24.875 19.292C24.875 16.3235 22.4685 13.917 19.5 13.917C16.5315 13.917 14.125 16.3235 14.125 19.292C14.125 22.2605 16.5315 24.667 19.5 24.667Z"
                                        stroke="white"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M1.58325 19.9439C1.58325 14.4525 1.58325 11.7076 2.92521 9.73679C3.50779 8.87976 4.25435 8.14659 5.12179 7.57962C6.41179 6.73217 8.02788 6.42938 10.5022 6.32188C11.6829 6.32188 12.6988 5.44396 12.9299 4.30625C13.1065 3.47289 13.5654 2.72607 14.2291 2.192C14.8928 1.65793 15.7205 1.36937 16.5723 1.37508H22.4275C24.1977 1.37508 25.7224 2.60238 26.07 4.30625C26.3011 5.44396 27.317 6.32188 28.4977 6.32188C30.9702 6.42938 32.5862 6.73396 33.878 7.57962C34.747 8.14937 35.4941 8.88217 36.0746 9.73679C37.4166 11.7076 37.4166 14.4525 37.4166 19.9439C37.4166 25.4336 37.4166 28.1784 36.0746 30.151C35.491 31.0072 34.7447 31.7402 33.878 32.3082C31.8696 33.6251 29.0728 33.6251 23.481 33.6251H15.5188C9.92704 33.6251 7.13025 33.6251 5.12179 32.3082C4.25559 31.7396 3.50982 31.006 2.927 30.1492C2.53867 29.5689 2.25208 28.9267 2.07954 28.2501M32.0416 13.9168H30.2499"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1">
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
            </ModalBody>

            <ModalFooter>
                <SubmitButton isLoading={isUpdating}>Save</SubmitButton>
            </ModalFooter>
        </Form>
    );
}
