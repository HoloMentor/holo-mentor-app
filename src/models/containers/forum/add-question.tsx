import Content from '@/components/content';
import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormEditor from '@/components/form/editor';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import useErrorHandler from '@/hooks/error-handler';
import classTopicServices from '@/redux/services/class/topics.service';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import forumServices from '@/redux/services/forum.services';

const initialValues = {
    topic: '',
    subTopic: '',
    question: ''
};

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    subTopic: Yup.string().required('Sub topic is required'),
    question: Yup.mixed().required('Question is required')
});

export default function ForumEssay() {
    const dispatch = useDispatch();
    const { classId } = useParams();
    const { user } = useSelector((state: IRootState) => state.user);
    const navigate = useNavigate();

    const {
        data: classTopics,
        isLoading: isClassTopicsLoading,
        error: classTopicsError,
        isError: isClassTopicsError
    } = classTopicServices.useGetClassTopicsQuery(
        {
            classId: classId,
            materials: false
        },
        {
            skip: !classId
        }
    );
    useErrorHandler(isClassTopicsError, classTopicsError);

    const classTopicsData = useMemo(() => {
        return (
            classTopics?.data?.map((topic: { id: number | string; name: string }) => ({
                value: topic.id,
                label: topic.name
            })) || []
        );
    }, [classTopics]);

    // Function to get subtopics based on selected topic
    const getClassSubTopics = useCallback(
        (topicId: number | string): { value: string; label: string }[] => {
            if (!topicId) return [];

            return (
                classTopics?.data
                    .find(
                        (topic: { id: number | string }) =>
                            topic.id.toString() === topicId.toString()
                    )
                    ?.subTopics?.map((subTopic: { id: number | string; name: string }) => ({
                        value: subTopic.id,
                        label: subTopic.name
                    })) || []
            );
        },
        [classTopics]
    );

    const [createMcq, { isLoading: isCreating, isError: isMcqCreateError, error: mcqCreateError }] =
        forumServices.useCreateMcqMutation();
    useErrorHandler(isMcqCreateError, mcqCreateError);

    const onSubmit = async (values: FormikValues) => {
        const result = await createMcq({
            userId: user.userId,
            email: user.email,
            classId: classId,
            ...values
        });

        if (result?.data?.status === 200 || result?.data?.status === 201) {
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: result.data.message
                })
            );

            dispatch(modelActions.hide());
            navigate(-1)
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>
            <Content>
                <SubHeading>Add Essay Question</SubHeading>

                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4"
                    children={({ values, setFieldValue }) => {
                        const subTopicsData = getClassSubTopics(values.topic);

                        return (
                            <>
                                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                    <FormAutoComplete
                                        label="Select a topic"
                                        name="topic"
                                        defaultItems={classTopicsData}
                                        isRequired
                                        isLoading={isClassTopicsLoading}
                                        onSelectionChange={() => setFieldValue('subTopic', '')}
                                    />
                                    <FormAutoComplete
                                        isDisabled={!values.topic}
                                        label="Select a sub topic"
                                        name="subTopic"
                                        defaultItems={subTopicsData}
                                        isRequired
                                    />
                                </div>

                                <FormEditor
                                    className="min-h-72"
                                    classNames={{
                                        mainWrapper: 'col-span-2'
                                    }}
                                    label="Question"
                                    name="question"
                                />

                                <SubmitButton className="mt-5" isLoading={isCreating}>
                                    Submit Question
                                </SubmitButton>
                            </>
                        );
                    }}
                />
            </Content>
        </div>
    );
}
