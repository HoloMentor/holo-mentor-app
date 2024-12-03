import Form from '@/components/form';
import SubmitButton from '@/components/form/button.tsx';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import announcementServices from '@/redux/services/announcement.service';
import useErrorHandler from '@/hooks/error-handler.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import { notifyActions } from '@/redux/reducers/notify.reducer.ts';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import FormInput from '@/components/form/input.tsx';

const initialValues = {
    title: '',
    announcement: ''
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    announcement: Yup.string().required('Announcement is required')
});

export default function AddAnnouncement({}: ModelContainerProps) {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const [
        createAnnouncement,
        { isLoading: isAnnouncementCreating, isError: isAnnouncementCreateError, error: announcementCreateError }
    ] = announcementServices.useCreateMutation();
    useErrorHandler(isAnnouncementCreateError, announcementCreateError);

    const onSubmit = async (values: FormikValues) => {

        const result = await createAnnouncement({
            instituteId: user.instituteId,
            title: values.title,
            announcement: values.announcement 
        });

        if (result?.data?.status === 201 || result?.data?.status === 200) {
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
                Add an Announcement
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
                <FormInput label="Title" placeholder="Title" name="title" isRequired />
                <FormInput label="Announcement" placeholder="Announcement" name="announcement" isRequired />
            </ModalBody>
            <ModalFooter>
                <SubmitButton isLoading={isAnnouncementCreating} type="submit">
                    Add
                </SubmitButton>
            </ModalFooter>
        </Form>
    );
}
