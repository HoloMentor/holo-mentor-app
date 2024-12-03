import { Avatar, Button } from '@nextui-org/react';
import Form from '@/components/form';
import * as Yup from 'yup';
import { FormikValues } from 'formik';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import moment from 'moment';
import FormEditor from '../form/editor';
import SubmitButton from '../form/button';
import commentServices from '@/redux/services/forum.comment.service';
import useErrorHandler from '@/hooks/error-handler';

interface Props {
    onCancel: () => void;
    reply?: boolean;
    questionId: number; 
}

const initialValues = {
    reply: '',
    questionId: '',
    userId: ''
};



const validationSchema = Yup.object().shape({
    reply: Yup.mixed().required('Reply is required')
});

export default function ForumQuestionReplyForm({ reply = false, onCancel, questionId }: Props) {
    const { user } = useSelector((state: IRootState) => state.user);
    console.log('User:', user);
    console.log('Question ID:', questionId);
    console.log('Reply:', reply);
    console.log('userID',user.userId);
    const [createComment,{ isLoading:isCommentLoading, error:commentCreateError }] = commentServices.useCreateCommentMutation();
    console.log(isCommentLoading, commentCreateError,'there is an error here if no then nice');
    useErrorHandler(isCommentLoading, commentCreateError);


    const onSubmit = async (values: FormikValues) => {
        console.log(values);
        console.log('Submitting comment: Need this first');
        console.log('Submitting comment:', values.reply);
        try {
            await createComment({
                reply: values.reply,
                userId: user.userId,
                questionId: questionId
            }).unwrap();
            console.log('Comment submitted successfully');
            onCancel();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };


    return (
        <div className={`flex gap-4 p-3 ${reply ? 'pl-20' : ''}`}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

            <Form
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}
                className="flex flex-col w-full gap-5 p-4 rounded-lg bg-second-white">
                <div className="flex justify-between gap-2">
                    <h3 className="font-semibold">
                        {user.firstName} {user.lastName}
                    </h3>
                    <span className="text-sm text-dark-gray">{moment().format('MMM D, YYYY')}</span>
                </div>

                <FormEditor className="overflow-auto max-h-32" name="reply" />

                <div className="flex items-center justify-end gap-3">
                    <Button size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                    <SubmitButton size="sm"  type="submit" isLoading={isCommentLoading}>Submit</SubmitButton>
                </div>
            </Form>
        </div>
    );
}
