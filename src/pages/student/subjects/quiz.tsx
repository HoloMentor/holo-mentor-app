import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import Select, { SelectValue } from '@/components/select';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { IRootState } from '@/redux';
import quizServices from '@/redux/services/quiz.service';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useErrorHandler from '@/hooks/error-handler';
import { Skeleton } from '@nextui-org/react';
import Content from '@/components/content';

const filterOptions = [
    {
        value: 'top',
        label: 'Top'
    }
];

interface Quiz {
    attemptStartedAt: string | number | Date;
    id: number;
    quizName: string;
    classId: number;
    userId: number;
    mcqQuestionIds: number[];
    status: number;
    createdAt: string;
}

export default function SubjectQuiz() {
    const { user } = useSelector((state: IRootState) => state.user);

    const navigate = useNavigate();
    const [startAttempt] = quizServices.useStartQuizAttemptMutation();
    const [reviewAttempt] = quizServices.useReviewQuizAttemptMutation();

    const location = useLocation();
    // const params = location.search;
    // const searchParams = new URLSearchParams(params.toString());

    const { subjectId } = useParams<{ subjectId: string }>();

    const {
        data: quizzes,
        isError: isQuizzesError,
        error: quizzesError,
        isLoading: isQuizzesLoading
    } = quizServices.useGetQuizzesQuery(
        {
            userId: user.userId,
            classId: parseInt(subjectId)
        },
        {
            skip: !user.userId
        }
    );
    useErrorHandler(isQuizzesError, quizzesError);
    // console.log(user.userId);
    // console.log(quizzes);

    // use generateQuiz mutation to generate quiz for the subject
    const {
        data: generatedQuiz,
        // isError: isGeneratedQuizError,
        // error: generatedQuizError,
        // isLoading: isGeneratedQuizLoading
    } = quizServices.useGenerateQuizQuery(
        {
            userId: user.userId,
            classId: parseInt(subjectId)
        },
        {
            skip: !user.userId
        }
    );
    // useErrorHandler(isGeneratedQuizError, generatedQuizError);
    // console.log(generatedQuiz, 'generated Quiz');

    const handleStartAttempt = async (quiz: Quiz) => {
        try {
            const response = await startAttempt({
                quizId: quiz.id,
                userId: user.userId
            }).unwrap();

            if (response) {
                const quizTime = 30 * 60 * 1000; // 30 minutes
                let navigateTo = `${location.pathname}/attempt/${quiz.id}`;
                // if attemptstated time is later than 30 minutes, then navigate to quiz review
                if (new Date().getTime() - new Date(response.data).getTime() > quizTime)
                    navigateTo = `${location.pathname}/${quiz.id}`;

                navigate(navigateTo, {
                    state: {
                        mcqQuestionIds: quiz.mcqQuestionIds,
                        quizId: quiz.id,
                        question_index: 0,
                        quizName: quiz.quizName,
                        attemptStartedAt: new Date(response.data)
                    }
                });
            }
        } catch (error) {
            console.error('Failed to start quiz attempt:', error);
        }
    };

    // handle review attempt
    const handleReviewAttempt = async (quiz: Quiz) => {
        try {
            const response = await reviewAttempt({
                quizId: quiz.id,
                userId: user.userId
            }).unwrap();

            if (response) {
                navigate(`${location.pathname}/${quiz.id}`, {
                    state: {
                        mcqQuestionIds: quiz.mcqQuestionIds,
                        quizId: quiz.id,
                        question_index: 0,
                        quizName: quiz.quizName,
                        attemptStartedAt: new Date(response.data)
                    }
                });
            }
        } catch (error) {
            console.error('Failed to review quiz attempt:', error);
        }
    };

    // separate the quizzes based on status
    // status 0 => Active
    // status 1 => Completed
    // if quiz.attemptStartedAt is within 30 minutes, then quiz is active
    // else quiz is completed

    const activeQuizzes = quizzes?.filter((quiz: Quiz) => {
        // if null, then quiz is active
        if (!quiz.attemptStartedAt) return true;
        const currentTime = new Date().getTime();
        const quizTime = new Date(quiz.attemptStartedAt).getTime();
        const difference = currentTime - quizTime;
        return difference <= 1800000;
    });

    const completedQuizzes = quizzes?.filter(
        (quiz: Quiz) =>
            !activeQuizzes?.find((activeQuiz: { id: number }) => activeQuiz.id === quiz.id)
    );

    const [filterValue, setFilterValue] = useState<SelectValue>('top');
    const [fillColors, setFillColors] = useState(Array(5).fill('#B1B1B1')); // Initial color green

    const toggleFillColor = (index: number) => {
        setFillColors((prevColors) =>
            prevColors.map((color, i) =>
                i === index ? (color === '#B1B1B1' ? '#FFC107' : '#B1B1B1') : color
            )
        );
    };

    return isQuizzesLoading ? (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <Content>
                <div className="grid justify-between grid-cols-1 gap-6 pr-4">
                    {Array.from({ length: 3 }).map((_, index) => {
                        return (
                            <div
                                key={`skeleton-${index}`}
                                className="w-full flex items-center gap-3 py-6">
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Content>
        </div>
    ) : quizzes?.data?.length === 0 ? (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <Content>
                <div className="flex flex-col gap-5 justify-center items-center h-full">
                    <img className="max-w-64" src="/images/empty.svg" alt="Void" />
                    <h3>No quizzes are found yet.</h3>
                </div>
            </Content>
        </div>
    ) : (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <section className="flex items-center justify-between gap-5 pr-5">
                <div className="w-full max-w-36">
                    <Select options={filterOptions} value={filterValue} onChange={setFilterValue} />
                </div>
                <div className="flex items-center gap-2">
                    <Input placeholder="Search" />
                </div>
            </section>

            <section className="flex flex-col gap-5 pr-5 mb-8">
                {activeQuizzes?.map((quiz: Quiz, i: number) => {
                    return (
                        <div
                            key={i}
                            className="flex justify-between gap-3 bg-white rounded-md p-6 shadow-lg max-md:flex-col">
                            <Link
                                to={`${location.pathname}/attempt/${quiz.id}`}
                                className="flex flex-col gap-1 text-black hover:text-black max-md:text-sm">
                                <h3 className="font-semibold text-lg">{quiz.quizName}</h3>
                                <div>
                                    Status:{' '}
                                    <span
                                        className="bg-[#489F2D] border-green-200 text-white
                                    ml-1 px-2 py-1 rounded-md text-sm">
                                        Active
                                    </span>
                                </div>
                                <div>Publish Date : {new Date(quiz.createdAt).toDateString()}</div>
                            </Link>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center items-center h-full max-md:justify-start">
                                    <svg
                                        className="me-2 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="23"
                                        viewBox="0 0 23 23"
                                        fill={fillColors[i]}
                                        onClick={() => toggleFillColor(i)}>
                                        <path
                                            d="M11.7004 17.1268L15.6775 19.5322C16.4058 19.973 17.2971 19.3214 17.1054 18.4972L16.0513 13.9739L19.5683 10.9264C20.2104 10.3705 19.8654 9.31635 19.0221 9.24927L14.3933 8.85635L12.5821 4.58219C12.2563 3.80594 11.1446 3.80594 10.8188 4.58219L9.0075 8.84677L4.37875 9.23969C3.53542 9.30677 3.19042 10.3609 3.8325 10.9168L7.34958 13.9643L6.29542 18.4876C6.10375 19.3118 6.995 19.9634 7.72333 19.5226L11.7004 17.1268Z"
                                            fill={fillColors[i]}
                                        />
                                    </svg>

                                    {/* <Link to={`${location.pathname}/attempt/${quiz.id}`}> */}
                                    <Button
                                        onClick={() => handleStartAttempt(quiz)}
                                        className="flex items-center gap-2 rounded-lg border-1 hover:bg-white hover:text-dark-green hover:border-dark-green">
                                        Answer Questions
                                    </Button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
            <section className="flex flex-col gap-5 pr-5">
                {completedQuizzes?.map((quiz: Quiz, i: number) => {
                    return (
                        <div
                            key={i}
                            className="flex justify-between gap-3 bg-white rounded-md p-6 shadow-lg max-md:flex-col">
                            <Link
                                to={`${location.pathname}/${quiz.id}`}
                                className="flex flex-col gap-1 text-black hover:text-black max-md:text-sm">
                                <h3 className="font-semibold text-lg">{quiz.quizName}</h3>
                                <div>
                                    Status:{' '}
                                    <span
                                        className="bg-dark-green border-green-200 text-white
                                    ml-1 px-2 py-1 rounded-md text-sm">
                                        Completed
                                    </span>
                                </div>
                                <div>Publish Date : {new Date(quiz.createdAt).toDateString()}</div>
                            </Link>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center items-center h-full max-md:justify-start">
                                    <svg
                                        className="me-2 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="23"
                                        viewBox="0 0 23 23"
                                        fill={fillColors[i]}
                                        onClick={() => toggleFillColor(i)}>
                                        <path
                                            d="M11.7004 17.1268L15.6775 19.5322C16.4058 19.973 17.2971 19.3214 17.1054 18.4972L16.0513 13.9739L19.5683 10.9264C20.2104 10.3705 19.8654 9.31635 19.0221 9.24927L14.3933 8.85635L12.5821 4.58219C12.2563 3.80594 11.1446 3.80594 10.8188 4.58219L9.0075 8.84677L4.37875 9.23969C3.53542 9.30677 3.19042 10.3609 3.8325 10.9168L7.34958 13.9643L6.29542 18.4876C6.10375 19.3118 6.995 19.9634 7.72333 19.5226L11.7004 17.1268Z"
                                            fill={fillColors[i]}
                                        />
                                    </svg>

                                    {/* <Link to={`${location.pathname}/${quiz.id}`}> */}
                                    <Button
                                        // onClick={() => handleStartAttempt(quiz)}
                                        onClick={() => handleReviewAttempt(quiz)}
                                        className="flex items-center gap-2 rounded-lg bg-white text-dark-green border-dark-green border-1 hover:bg-dark-green hover:text-white hover:border-dark-green">
                                        View Answers
                                    </Button>
                                    {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
