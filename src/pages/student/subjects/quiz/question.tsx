import Heading from '@/components/headings/main';

import Content from '@/components/content';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { JSXElementConstructor, Key, ReactElement, ReactNode, SetStateAction, useState } from 'react';
import quizServices from '@/redux/services/quiz.service';
import useErrorHandler from '@/hooks/error-handler';
import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

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
    // http://localhost:3000/subjects/0/quiz/attempt/0
    // let location = useLocation().pathname;
    // let quizId = Number(location.match(/\d+$/)[0]);
    // let next_url = location.replace(/\d+$/, (quizId + 1).toString());
    // let prev_url = location.replace(/\d+$/, (quizId - 1).toString());
    // if (quizId === 0) prev_url = location;

    // let next_url, prev_url = "";

    const location = useLocation();
    const navigate = useNavigate();
    const { mcqQuestionIds, quizId, question_index, quizName } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(question_index || 0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const [answersMap, setAnswersMap] = useState<Record<string, string>>({});
    const currentQuestionId = mcqQuestionIds?.[currentQuestionIndex];
    const [submitAnswer, { isLoading: isSubmitting }] = quizServices.useSubmitAnswerMutation();

    const handleAnswerSelect = async (value: string) => {
        // Update selected answer state
        setSelectedAnswer(value);
        
        // Store in answers map
        setAnswersMap(prev => ({
            ...prev,
            [currentQuestionId]: value
        }));

        // Submit to API
        try {
            await submitAnswer({
                questionId: currentQuestionId,
                answerId: value,
                quizId: quizId
            });
        } catch (err) {
            console.error('Failed to submit answer:', err);
        }
    };


    console.log(mcqQuestionIds, quizId, question_index, quizName);
    // return null;
    // if these values are not present or undefined, redirect to the quiz page

    // http://localhost:3000/subjects/1/quiz/attempt/1
    // let subjectId = 0;
    const { subjectId } = useParams<{ subjectId: string }>();
    // console.log(subjectId, "subjectId");

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
    console.log(question_index, currentQuestionIndex, mcqQuestionIds);

    const handleNext = () => {
        if (currentQuestionIndex < mcqQuestionIds.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            const nextQuestionId = mcqQuestionIds[nextIndex];
            
            navigate(`${location.pathname}`, {
                state: {
                    mcqQuestionIds,
                    quizId, 
                    question_index: nextIndex,
                    quizName
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
                    quizName
                }
            });
            setCurrentQuestionIndex((prev: number) => prev - 1);
            setSelectedAnswer('');
        }
    };

    console.log(question);

    // {
    //     "data": {
    //         "id": 13,
    //         "classId": 1,
    //         "userId": 2,
    //         "topic": "6",
    //         "subTopic": "6",
    //         "question": [
    //             {
    //                 "id": "cea7c819-02ab-4074-9e2d-354832f38ed4",
    //                 "type": "paragraph",
    //                 "props": {
    //                     "textColor": "default",
    //                     "textAlignment": "left",
    //                     "backgroundColor": "default"
    //                 },
    //                 "content": [
    //                     {
    //                         "text": "Hi Hello Yaluwane Oyalata kohomada ithin bath kawada???",
    //                         "type": "text",
    //                         "styles": {}
    //                     }
    //                 ],
    //                 "children": []
    //             }
    //         ],
    //         "answer": 2,
    //         "mcqAnswer": [
    //             {
    //                 "index": 0,
    //                 "value": "3"
    //             },
    //             {
    //                 "index": 1,
    //                 "value": "34"
    //             },
    //             {
    //                 "index": 2,
    //                 "value": "45"
    //             },
    //             {
    //                 "index": 3,
    //                 "value": "hghg"
    //             },
    //             {
    //                 "index": 4,
    //                 "value": "12"
    //             }
    //         ]
    //     },
    //     "message": "Question found",
    //     "status": 200
    // }

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

                {/* pagination btns */}
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

            <Content className="py-20 my-4 shadow-lg">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-2 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">
                        {quizName} - Quiz
                    </h3>
                    <h4 className="font-semibold text-xl">Question {currentQuestionIndex + 1}</h4>
                    <div>{renderQuestionContent(question)}</div>

                    <div className="flex flex-col pl-4 gap-2">
                        {question?.data?.mcqAnswer?.map((mcq: { value: String; }, i: Key) => {
                            return (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="q1"
                                        id={`q1b-${i}`}
                                        checked={selectedAnswer === mcq.value}
                                        onChange={() => setSelectedAnswer(mcq.value as string)}
                                    />
                                    <label htmlFor={`q1b-${i}`}>{mcq.value}</label>
                                </div>
                            );
                        })}
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
                            ${currentQuestionIndex === mcqQuestionIds.length - 1 ? 'cursor-not-allowed' : ''}`}
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
