import Button from '@/components/button';
import Heading from '@/components/headings/main';

import Content from '@/components/content';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import quizServices from '@/redux/services/quiz.service';
import { IRootState } from '@/redux';
import useErrorHandler from '@/hooks/error-handler';
// import { Key } from 'react';

interface QuestionResult {
    question: Array<{
        content: Array<{
            text: string;
            type: string;
            styles: Record<string, boolean>;
        }>;
    }>;
    mcq_answers: Array<{
        index: number;
        value: string;
    }>;
    correct_answer: number;
    student_answer: number | null;
}

// interface QuizResults {
//     quiz_id: number;
//     attempt_started_at: string;
//     questions: QuestionResult[];
//     quiz_name: string;
//     status: number;
// }

export default function QuizInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    // const { mcqQuestionIds, quizId, question_index, quizName, attemptStartedAt } = location.state || {};
    const { quizId, quizName, attemptStartedAt } = location.state || {};

    const { subjectId } = useParams<{ subjectId: string }>();

    const { user } = useSelector((state: IRootState) => state.user);
    // console.log(mcqQuestionIds, quizId, question_index, quizName, attemptStartedAt);
    // console.log(quizId);

    // get quiz answers
    const {
        data: quizResults,
        // isLoading,
        isError,
        error
    } = quizServices.useGetQuizAnswersQuery(
        {
            quizId: quizId,
            userId: user.userId
        },
        {
            skip: !quizId
        }
    );

    useErrorHandler(isError, error);
    let questions = quizResults?.data?.questions;

    // console.log(quizResults, 'quizResults');
    // console.log(quizResults?.data);
    // console.log(questions, 'question');
    // questions?.map((question: QuestionResult, index: number) => console.log(question, 'question'));

    // reattempt quiz
    const [reAttemptQuizMutation] = quizServices.useReAttemptQuizMutation();
    const { data: quizzes, refetch: refetchQuizzes } = quizServices.useGetQuizzesQuery({
        classId: parseInt(subjectId),
        userId: user.userId
    });

    const handleReAttempt = async () => {
        try {
            const response = await reAttemptQuizMutation({
                quizId: quizId,
                userId: user.userId
            }).unwrap();

            if (response) {
                await refetchQuizzes();
                const quiz = quizzes?.find((quiz: { id: any }) => quiz.id === quizId);

                let navigateTo = location.pathname.split('/').slice(0, -1).join('/');
                navigateTo = `${navigateTo}/attempt/${quiz.id}`;

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

    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz Review</Heading>

            <Content className="py-20 my-4 shadow-lg max-md:px-6">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-8 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">
                        {quizName} - Quiz
                    </h3>

                    {/* <p>
                        Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                        accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                        turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                        fringilla accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                    </p> */}

                    <Button
                        onClick={handleReAttempt}
                        className="flex mx-auto items-center gap-2 rounded-lg border-1 hover:bg-white hover:text-dark-green hover:border-dark-green">
                        Re Attempt
                    </Button>

                    <h4 className="font-semibold text-xl px-2">Previous Attempt</h4>

                    <Accordion variant="splitted" selectionMode="multiple">
                        <AccordionItem
                            key={`teacher-1`}
                            aria-label={`Accordion Item 1`}
                            title={
                                <div className="text-sm flex gap-4 justify-between items-center px-4">
                                    <div>
                                        <div className="text-lg font-semibold text-dark-green">
                                            Finished
                                        </div>
                                        Submitted on{' '}
                                        {new Intl.DateTimeFormat('en-US', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        }).format(attemptStartedAt)}
                                    </div>
                                    <div className="font-semibold">Marks : 8/10</div>
                                </div>
                            }
                            className="!shadow-none border border-light-border rounded-lg p-0"
                            classNames={{
                                content: 'flex flex-col gap-10 px-4'
                            }}>
                            <div className="pb-4" key={`teacher-2`}>
                                {/* <div className="flex flex-col gap-6 mb-4">
                                    <div>
                                        <span className="font-semibold">Q No : 01</span>
                                        <span className="border-green-800 border-1 text-green-800 rounded-full px-2 py-1 ml-2 text-xs">
                                            Correct
                                        </span>
                                        <span className="border-red-600 border-1 text-red-600 rounded-full px-2 py-1 ml-2 text-xs">
                                            Incorrect
                                        </span>
                                    </div>
                                    <p className="pl-4">
                                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                                        dignissim, metus nec fringilla accumsan, Torem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie, dictum est a, mattis tellus. Sed dignissim, metus
                                        nec fringilla accumsan, Torem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                    </p>

                                    <div className="flex flex-col pl-8 gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                className="text-lime-600"
                                                type="radio"
                                                name="q1"
                                                id="q1a"
                                                disabled
                                                checked
                                            />
                                            <label className="text-lime-600" htmlFor="q1a">
                                                Torem ipsum dolor sit amet, consectetur
                                            </label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <input
                                                className="text-red-600"
                                                type="radio"
                                                name="q2"
                                                id="q1a"
                                                disabled
                                                checked
                                            />
                                            <label className="text-red-600" htmlFor="q1a">
                                                Torem ipsum dolor sit amet, consectetur
                                            </label>
                                        </div>

                                        {Array.from({ length: 3 }).map((_, i) => {
                                            return (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="q1"
                                                        id={`q1b-${i}`}
                                                        disabled
                                                    />
                                                    <label htmlFor={`q1b-${i}`}>
                                                        Torem ipsum dolor sit amet, consectetur
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div> */}

                                {questions?.map((question: QuestionResult, index: number) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-6 mb-4 border-b-1 pb-4">
                                        <div>
                                            <span className="font-semibold">
                                                Question No : {index + 1}
                                            </span>
                                            <span
                                                className={`border-green-800 border-1 text-green-800 rounded-full px-2 py-1 ml-2 text-xs ${
                                                    question.student_answer ===
                                                    question.correct_answer
                                                        ? 'visible'
                                                        : 'hidden'
                                                }`}>
                                                Correct
                                            </span>
                                            <span
                                                className={`border-red-600 border-1 text-red-600 rounded-full px-2 py-1 ml-2 text-xs ${
                                                    question.student_answer !==
                                                    question.correct_answer
                                                        ? 'visible'
                                                        : 'hidden'
                                                }`}>
                                                Incorrect
                                            </span>
                                        </div>
                                        <p className="pl-4">
                                            {question.question[0].content[0].text}
                                        </p>

                                        <div className="flex flex-col pl-8 gap-2">
                                            {question.mcq_answers.map((answer, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`q${index}-${answer.value}`}
                                                        id={`q${index}-${i}`}
                                                        disabled
                                                        // blue outline for correct answer
                                                        // red outline for incorrect answer
                                                        // green outline ifs student answer is correct
                                                        checked={
                                                            question.student_answer === i ||
                                                            question.correct_answer === i
                                                        }
                                                        className={`${
                                                            question.student_answer ===
                                                                question.correct_answer &&
                                                            question.student_answer === i
                                                                ? 'text-green-600'
                                                                : question.student_answer === i
                                                                ? 'text-red-600'
                                                                : question.correct_answer === i
                                                                ? 'text-blue-600'
                                                                : ''
                                                        }`}
                                                    />
                                                    <label htmlFor={`q${index}-${i}`}>
                                                        {answer.value}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Content>
        </div>
    );
}
