import Heading from '@/components/headings/main';

import Content from '@/components/content';
import { useLocation, useNavigate } from 'react-router-dom';
import { Key, useEffect, useState } from 'react';
import quizServices from '@/redux/services/quiz.service';
import useErrorHandler from '@/hooks/error-handler';
import { Skeleton } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';

type Props = {
    textColor: string;
    textAlignment: 'left' | 'center' | 'right';
    backgroundColor: string;
};

type ContentItem = {
    text: string;
    type: string;
    styles?: React.CSSProperties;
};

type Block = {
    id: string;
    type: string;
    props: Props;
    content: ContentItem[];
};

type QuestionData = {
    question: Block[];
};

type QuestionResponse = {
    data?: QuestionData;
};

export default function QuizQuestion() {
    const quizTime = 30 * 60 * 1000;

    const location = useLocation();
    const navigate = useNavigate();
    const { mcqQuestionIds, quizId, question_index, quizName, attemptStartedAt } =
        location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(question_index || 0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
    const [timeRemaining, setTimeRemaining] = useState<number>(0);

    const { user } = useSelector((state: IRootState) => state.user);

    // Add API mutation hook
    const [submitAnswer] = quizServices.useSubmitAnswerMutation();

    // Handle answer selection and submission
    const handleAnswerSelect = async (answer: string, value: string) => {
        setSelectedAnswer(value);
        setAnswersMap((prev) => ({
            ...prev,
            [mcqQuestionIds[currentQuestionIndex]]: value
        }));

        try {
            const response = await submitAnswer({
                quiz_id: quizId,
                questionId: mcqQuestionIds[currentQuestionIndex],
                userId: user.userId,
                answer: answer
            }).unwrap();
            if (response) {
                // setSelectedAnswer(value);
            }
        } catch (error) {
            console.error('Failed to submit answer:', error);
            setSelectedAnswer('');
        }
    };

    // console.log(mcqQuestionIds, quizId, question_index, quizName);
    // if these values are not present or undefined, redirect to the quiz page
    const { subjectId } = useParams<{ subjectId: string }>();
    if (!mcqQuestionIds || !quizId || !quizName) {
        navigate(`/subjects/${subjectId}/quiz/${quizId}`);
    }

    // Get current question details
    const {
        data: question,
        isLoading,
        isError,
        error
    } = quizServices.useGetQuestionQuery(
        {
            questionId: mcqQuestionIds?.[currentQuestionIndex]
        },
        {
            skip: !mcqQuestionIds?.[currentQuestionIndex]
        }
    );

    useErrorHandler(isError, error);
    // console.log(question_index, currentQuestionIndex, mcqQuestionIds);

    const handleNext = () => {
        if (currentQuestionIndex < mcqQuestionIds.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            const nextQuestionId = mcqQuestionIds[nextIndex];

            navigate(`${location.pathname}`, {
                state: {
                    mcqQuestionIds,
                    quizId,
                    question_index: nextIndex,
                    quizName,
                    attemptStartedAt
                }
            });

            setCurrentQuestionIndex(nextIndex);
            setSelectedAnswer(answersMap[nextQuestionId] || '');
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            navigate(`${location.pathname}`, {
                state: {
                    mcqQuestionIds,
                    quizId,
                    question_index: currentQuestionIndex - 1,
                    quizName,
                    attemptStartedAt
                }
            });
            setCurrentQuestionIndex((prev: number) => prev - 1);
            setSelectedAnswer(answersMap[mcqQuestionIds[currentQuestionIndex - 1]] || '');
        }
    };

    // count down timer
    useEffect(() => {
        const startTime = new Date(attemptStartedAt).getTime();
        const endTime = startTime + quizTime;
        const remaining = endTime - Date.now();

        setTimeRemaining(Math.max(0, remaining));
        const timer = setInterval(() => {
            const newRemaining = endTime - Date.now();
            if (newRemaining <= 0) {
                clearInterval(timer);
                navigate(`/subjects/${subjectId}/quiz`);
            } else setTimeRemaining(newRemaining);
        }, 1000);

        return () => clearInterval(timer);
    }, [attemptStartedAt, navigate, subjectId]);

    const minutes = Math.floor(timeRemaining / 1000 / 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    const renderQuestionContent = (question: QuestionResponse | undefined): JSX.Element | null => {
        if (!question?.data?.question) return null;

        return (
            <>
                {question.data.question.map((block: Block) => {
                    if (block.type === 'paragraph') {
                        const { content, props } = block;
                        return (
                            <p
                                key={block.id}
                                style={{
                                    color:
                                        props.textColor === 'default' ? 'inherit' : props.textColor,
                                    textAlign: props.textAlignment,
                                    backgroundColor:
                                        props.backgroundColor === 'default'
                                            ? 'transparent'
                                            : props.backgroundColor
                                }}
                                className="mb-4">
                                {content.map((item, idx) => (
                                    <span key={idx} style={item.styles || {}}>
                                        {item.text}
                                    </span>
                                ))}
                            </p>
                        );
                    }
                    return null;
                })}
            </>
        );
    };

    // use skeleton loader
    return isLoading ? (
        <div className="flex flex-col gap-3">
            <Heading>Attempt Quiz</Heading>

            <Content className="py-20 my-4 shadow-lg">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-2 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">Quiz Name</h3>
                    <h4 className="font-semibold text-xl">Question 0{quizId + 1}</h4>

                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>

                <div className="flex justify-center mt-4t">
                    <button
                        className={`px-4 py-2 rounded-xl mr-2 text-3xl font-extralight bg-gray-200 text-dark-green 
                            ${currentQuestionIndex === 0 ? 'cursor-not-allowed' : ''}`}
                        onClick={handlePrevious}>
                        &lt;
                    </button>
                    <button
                        className="px-4 py-2 rounded-xl text-3xl font-extralight bg-dark-green text-white hover:text-white"
                        onClick={handleNext}>
                        &gt;
                    </button>
                </div>
            </Content>
        </div>
    ) : (
        <div className="flex flex-col gap-3">
            <Heading>Attempt Quiz</Heading>

            <Content className="pb-20 pt-14 my-4 shadow-lg">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-2 max-md:w-full max-md:text-sm">
                    <div className="mx-auto mb-6">
                        <h3 className="text-lg font-bold mb-2">Time Remaining</h3>
                        <div className="flex items-center gap-2 justify-center">
                            <div className="flex flex-col items-center rounded-lg bg-gray-200 p-3">
                                <span className="text-3xl font-bold">
                                    {minutes.toString().padStart(2, '0')}
                                </span>
                                <span className="text-xs">Minutes</span>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-gray-200 p-3">
                                <span className="text-3xl font-bold">
                                    {seconds.toString().padStart(2, '0')}
                                </span>
                                <span className="text-xs">Seconds</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-center text-dark-green font-bold text-3xl">
                        {quizName} - Quiz
                    </h3>
                    <h4 className="font-semibold text-xl">Question {currentQuestionIndex + 1}</h4>
                    <div>{renderQuestionContent(question)}</div>

                    <div className="flex flex-col pl-4 gap-2">
                        {question?.data?.mcqAnswer?.map(
                            (
                                mcq: {
                                    index: String;
                                    value: String;
                                },
                                i: Key
                            ) => {
                                return (
                                    <div key={i} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="q1"
                                            id={`q1b-${i}`}
                                            checked={selectedAnswer === mcq.value}
                                            className="cursor-pointer"
                                            // onChange={() => setSelectedAnswer(mcq.value as string)
                                            onChange={() =>
                                                handleAnswerSelect(
                                                    mcq.index as string,
                                                    mcq.value as string
                                                )
                                            }
                                        />
                                        <label
                                            className="w-full cursor-pointer"
                                            htmlFor={`q1b-${i}`}>
                                            {mcq.value}
                                        </label>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                {/* pagination btns */}

                <div className="flex justify-center mt-4t">
                    <button
                        className={`px-4 py-2 rounded-xl mr-2 text-3xl font-extralight bg-gray-200 text-dark-green 
                                ${currentQuestionIndex === 0 ? 'cursor-not-allowed' : ''}`}
                        onClick={handlePrevious}>
                        &lt;
                    </button>
                    <button
                        className={`px-4 py-2 rounded-xl text-3xl font-extralight bg-dark-green text-white hover:text-white
                            ${
                                currentQuestionIndex === mcqQuestionIds.length - 1
                                    ? 'cursor-not-allowed'
                                    : ''
                            }`}
                        onClick={handleNext}>
                        &gt;
                    </button>
                </div>
            </Content>
        </div>
    );

    // return (
    //     <div className="flex flex-col gap-3">
    //         <Heading>Attempt Quiz</Heading>

    //         <Content className="py-20 my-4 shadow-lg">
    //             <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-2 max-md:w-full max-md:text-sm">
    //                 <h3 className="text-center text-dark-green font-bold text-3xl">Quiz Name</h3>
    //                 <h4 className="font-semibold text-xl">Question 0{quizId + 1}</h4>

    //                 <p className="pb-4">
    //                     Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
    //                     molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
    //                     accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
    //                     turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
    //                     fringilla accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit.
    //                 </p>

    //                 <div className="flex flex-col pl-4 gap-2">
    //                     {Array.from({ length: 5 }).map((_, i) => {
    //                         return (
    //                             <div key={i} className="flex items-center gap-2">
    //                                 <input type="radio" name="q1" id={`q1b-${i}`} />
    //                                 <label htmlFor={`q1b-${i}`}>
    //                                     Torem ipsum dolor sit amet, consectetur
    //                                 </label>
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //             </div>

    //             {/* pagination btns */}
    //             <div className="flex justify-center mt-4t">
    //                 <Link
    //                     to={prev_url}
    //                     className={`px-4 py-2 rounded-xl mr-2 text-3xl font-extralight bg-gray-200 text-dark-green
    //                         ${quizId === 0 ? 'cursor-not-allowed' : ''}`}>
    //                     &lt;
    //                 </Link>
    //                 <Link
    //                     to={next_url}
    //                     className="px-4 py-2 rounded-xl text-3xl font-extralight bg-dark-green text-white hover:text-white">
    //                     &gt;
    //                 </Link>
    //             </div>
    //         </Content>
    //     </div>
    // );
}
