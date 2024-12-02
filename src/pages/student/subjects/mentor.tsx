import Button from '@/components/button';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';

import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import studentServices from '@/redux/services/student.service';

import { Accordion, AccordionItem, Card, CardBody, Spinner } from '@nextui-org/react';
import { IRootState } from '@/redux';
import useErrorHandler from '@/hooks/error-handler';
import StudyPlanCard from '@/components/cards/study-plan-card';

export default function Mentor() {
    const { user } = useSelector((state: IRootState) => state.user);
    const { subjectId } = useParams<{ subjectId: string }>();
    // const { classId } = useParams();

    // const {
    //     data: studyPlans,
    //     isError: isStudyPlansError,
    //     error: studyPlansError,
    //     isLoading: isStudyPlansLoading
    // } = StudentServices.useGetTierStudyPlansQuery(
    //     {
    //         classId,
    //         tier
    //     },
    //     {
    //         skip: !classId || !tier
    //     }
    // );
    const {
        data: studyPlans,
        isError: isStudyPlansError,
        error: studyPlansError,
        isLoading: isStudyPlansLoading
    } = studentServices.useGetStudyPlansQuery(
        {
            // classId,
            // userId: user.id,
            studentId: user.userId,
            classId: parseInt(subjectId)
        },
        {
            skip: !subjectId || !user.userId
        }
    );
    useErrorHandler(isStudyPlansError, studyPlansError);
    console.log(studyPlans, 'studyPlans', subjectId, user.userId);

    return (
        <div className="flex flex-col gap-3">
            <Heading>HoloMentor</Heading>

            <Content>
                <SubHeading>Study Plans</SubHeading>

                <section className="my-5 mr-2">
                    <div className="flex flex-col w-full">
                        <Card className="rounded-md p-4 flex flex-col gap-3 shadow-none p-0">
                            <div className="flex flex-col">
                                {isStudyPlansLoading ? (
                                    <div className="flex justify-center items-center min-h-28">
                                        <Spinner />
                                    </div>
                                ) : studyPlans?.data?.length === 0 ? (
                                    <div className="flex flex-col gap-3 justify-center items-center p-5 mt-5">
                                        <img
                                            src="/images/empty.svg"
                                            className="max-w-40"
                                            alt="Empty"
                                        />
                                        <p>No Study Plans yet</p>
                                    </div>
                                ) : (
                                    <CardBody className="grid grid-cols-3 gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1">
                                        {studyPlans.data.map(
                                            (card: {
                                                id: number;
                                                name: string;
                                                description: string;
                                            }) => (
                                                <StudyPlanCard
                                                    key={card.id}
                                                    id={card.id}
                                                    description={card.description}
                                                    planName={card.name}
                                                    hideOptions={true}
                                                />
                                            )
                                        )}
                                    </CardBody>
                                )}
                            </div>
                        </Card>
                    </div>
                </section>

                {/* {true ? (
                    <div className="grid grid-cols-3">
                        <div className="relative flex flex-col w-full gap-4 p-6 bg-white rounded-lg shadow-xl d max-w-96 h-44">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-bold text-black">Road to A plan</h3>
                                <p>By Dr Amith Pussella</p>
                            </div>

                            <Button className="!py-1">Get Started</Button>
                            <img
                                className="absolute bottom-0 right-2"
                                src="/images/subjects/plan.svg"
                                alt="Study Plan"
                            />
                        </div>
                    </div>
                ) : (
                    <span className="inline-flex items-center justify-center w-full text-lg font-medium text-center min-h-32 text-dark-gray">
                        There’s no study plan added yet.
                    </span>
                )} */}
            </Content>

            {/* <Content>
                <SubHeading>Study Plans</SubHeading>

                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={<span className="text-2xl font-semibold">Task 01</span>}
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content: 'flex flex-col gap-10'
                                }}>
                                <div className="flex flex-col items-center justify-center gap-5 min-h-52">
                                    <p className="flex flex-col items-center gap-1">
                                        <span className="text-xl">
                                            Refer the study materials on topic
                                        </span>
                                        <span className="text-2xl font-medium">
                                            Measurement , 1.1 SI Measurement
                                        </span>
                                    </p>
                                    <Button>Mark as Complete</Button>
                                </div>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content> */}
        </div>
    );
}
