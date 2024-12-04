import Content from '@/components/content';
import Form from '@/components/form';
import FormAutoComplete from '@/components/form/autocomplete';
import SubmitButton from '@/components/form/button';
import FormEditor from '@/components/form/editor';
import FormInput from '@/components/form/input';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import classTopicServices from '@/redux/services/class/topics.service';
import forumServices from '@/redux/services/forum.service';
import { FieldArray, FormikValues } from 'formik';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    topic: '',
    subTopic: '',
    question: '',
    answers: [
        { index: 0, value: '' },
        { index: 1, value: '' },
        { index: 2, value: '' },
        { index: 3, value: '' },
        { index: 4, value: '' }
    ]
};

const validationSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    subTopic: Yup.string().required('Sub topic is required'),
    question: Yup.mixed().required('Question is required'),
    answers: Yup.array()
        .of(
            Yup.object().shape({
                value: Yup.string().required('Answer is required')
            })
        )
        .required('Answers are required')
});

export default function ForumMcq() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const { classId } = useParams();
    const navigate = useNavigate();

    console.log('I am the USer', user?.userId);

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
        console.log('Submitting MCQ:', values);
        const result = await createMcq({
            userId: user.userId,
            email: user.email,
            classId: classId,
            ...values
        });

        if (result?.data?.status === 200 || result?.data?.status === 201) {
            console.log('Navigation Path:', `/classes/${classId}/forum`);
            dispatch(
                notifyActions.open({
                    type: 'success',
                    message: result.data.message
                })
            );
            dispatch(modelActions.hide());
            navigate(`/classes/${classId}/forum`);
        } else {
            console.error('Error creating MCQ:', result);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>
            <Content>
                <SubHeading>Add MCQ Question</SubHeading>

                <Form
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4">
                    {({ values, setFieldValue }) => {
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

                                <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                                    <FormEditor
                                        className="min-h-52"
                                        classNames={{
                                            mainWrapper: 'col-span-2'
                                        }}
                                        label="Question"
                                        name="question"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-foreground">Answers</label>
                                        <FieldArray
                                            name="answers"
                                            render={({ form: { values } }) => {
                                                return values?.answers?.map((_: any, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-2">
                                                        <span className="text-xs font-medium text-gray-600">
                                                            0{i + 1}
                                                        </span>
                                                        <FormInput
                                                            placeholder={`Answer ${i + 1}`}
                                                            name={`answers.${i}.value`}
                                                            classNames={{ mainWrapper: 'w-full' }}
                                                        />
                                                    </div>
                                                ));
                                            }}
                                        />
                                    </div>
                                </div>

                                <SubmitButton className="mt-5" isLoading={isCreating}>
                                    Submit Question
                                </SubmitButton>
                            </>
                        );
                    }}
                </Form>
            </Content>
        </div>
    );
}
