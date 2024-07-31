import { Avatar, Button } from '@nextui-org/react';
import Form from '@/components/form';
import * as Yup from 'yup';
import { FormikValues } from 'formik';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import moment from 'moment';
import FormEditor from '../form/editor';
import SubmitButton from '../form/button';

interface Props {
    onCancel: () => void;
    reply?: boolean;
}

const initialValues = {
    email: ''
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required')
});

export default function ForumQuestionReplyForm({ reply = false, onCancel }: Props) {
    const { user } = useSelector((state: IRootState) => state.user);

    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div className={`flex gap-4 p-3 ${reply ? 'pl-20' : ''}`}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

            <Form
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                className="flex flex-col gap-5 bg-second-white w-full rounded-lg p-4">
                <div className="flex gap-2 justify-between">
                    <h3 className="font-semibold">
                        {user.firstName} {user.lastName}
                    </h3>
                    <span className="text-dark-gray text-sm">{moment().format('MMM D, YYYY')}</span>
                </div>

                <FormEditor className="max-h-32 overflow-auto" name="reply" />

                <div className="flex justify-end items-center gap-3">
                    <Button size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                    <SubmitButton size="sm">Submit</SubmitButton>
                </div>
            </Form>
        </div>
    );
}
