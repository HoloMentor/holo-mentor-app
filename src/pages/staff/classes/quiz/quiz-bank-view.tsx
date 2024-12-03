import Heading from '@/components/headings/main';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useErrorHandler from '@/hooks/error-handler';
import Reader from '@/components/editor/reader';
import classTopicServices from '@/redux/services/class/topics.service';
import questionServices from '@/redux/services/question.services';
import {
    Button as NextUIButton,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from '@nextui-org/react';

export default function Forum() {
    const { classId } = useParams();

    const {
        data: classTopics,
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

    const [deActivateQuestion] = questionServices.useDeActivateeQuestionMutation();
    const [activateQuestion] = questionServices.useActivateeQuestionMutation();

    const handleActivate = async (id: number) => {
        try {
            await activateQuestion({ id }).unwrap();
            console.log(`Question with id ${id} deactivated successfully`);
        } catch (error) {
            console.error('Failed to deactivate question:', error);
        }
    };

    const handleDeactivate = async (id: number) => {
        try {
            await deActivateQuestion({ id }).unwrap();
            console.log(`Question with id ${id} deactivated successfully`);
        } catch (error) {
            console.error('Failed to deactivate question:', error);
        }
    };

    const classTopicsData = useMemo(() => {
        return (
            classTopics?.data?.map((topic: { id: number | string; name: string }) => ({
                value: topic.id,
                label: topic.name
            })) || []
        );
    }, [classTopics]);
    console.log(classTopicsData);

    const {
        data: quizQuestions,
        error: quizQuestionsError,
        isError: isQuizQuestionsError
    } = questionServices.useGetAllQuestionsQuery(
        {
            classId: classId,
            materials: false
        },
        {
            skip: !classId
        }
    );

    useErrorHandler(isQuizQuestionsError, quizQuestionsError);

    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz Bank</Heading>

            <section className="flex flex-col gap-5 pr-5">
                {quizQuestions?.data?.map(
                    (_: {
                        id: number;
                        question: any;
                        subTopic: number;
                        mcqAnswer: any;
                        activation: number;
                    }) => {
                        const topicNumber = Number(_.subTopic);
                        const topic = classTopicsData.find(
                            (topic: { value: number }) => topic.value === topicNumber
                        );
                        console.log(typeof _.subTopic);
                        console.log(topic);
                        console.log('Answers:', _.mcqAnswer);
                        console.log('Activation:', _.activation);

                        return (
                            <div key={_.id} className="flex gap-3 p-6 bg-white rounded-md">
                                <div className="flex flex-col w-full gap-6 text-black hover:text-black">
                                    <h3 className="text-lg font-semibold">
                                        {topic ? topic.label : 'Unknown Topic'}
                                    </h3>
                                    {_.activation === 1 && (
                                        <span className="p-4 text-lg bg-red-200 rounded-md text-danger">
                                            Inactive
                                        </span>
                                    )}
                                    <Reader value={_.question} />
                                    <ul className="space-y-2">
                                        {_.mcqAnswer?.map(
                                            (
                                                answer: { index: number; value: string },
                                                i: number
                                            ) => (
                                                <li
                                                    key={i}
                                                    className="p-2 pl-5 rounded-lg border-medium border-spacing-5">
                                                    {answer.value}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <NextUIButton
                                                isIconOnly
                                                className="rounded-full !size-7 !min-w-7">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="size-5">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </NextUIButton>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownSection showDivider>
                                                <DropdownItem
                                                    endContent={
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-4">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                            />
                                                        </svg>
                                                    }
                                                    className="text-black"
                                                    key="edit">
                                                    Edit
                                                </DropdownItem>
                                            </DropdownSection>
                                            <DropdownSection>
                                                {_.activation === 0 && (
                                                    <DropdownItem
                                                        onClick={() => handleDeactivate(_.id)}
                                                        endContent={
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                className="size-4">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                />
                                                            </svg>
                                                        }
                                                        className="text-danger"
                                                        key="delete">
                                                        Deactivate
                                                    </DropdownItem>
                                                )}
                                                {_.activation === 1 && (
                                                    <DropdownItem
                                                        onClick={() => handleActivate(_.id)}
                                                        className="text-black"
                                                        key="delete">
                                                        Activate
                                                    </DropdownItem>
                                                )}
                                            </DropdownSection>
                                            
                                        </DropdownMenu>
                                    </Dropdown>
                                </>
                            </div>
                        );
                    }
                )}
            </section>
        </div>
    );
}