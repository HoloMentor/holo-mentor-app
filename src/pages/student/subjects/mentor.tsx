import Button from '@/components/button';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Mentor() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>HoloMentor</Heading>

            <Content>
                <SubHeading>Study Plans</SubHeading>

                {true ? (
                    <div className="grid grid-cols-3">
                        <div className="relative flex flex-col gap-4 rounded-lg bg-white shadow-xl d p-6 max-w-96 w-full h-44">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl text-black font-bold">Road to A plan</h3>
                                <p>By Dr Amith Pussella</p>
                            </div>

                            <Button className="!py-1">Get Started</Button>
                            <img
                                className="absolute right-2 bottom-0"
                                src="/images/subjects/plan.svg"
                                alt="Study Plan"
                            />
                        </div>
                    </div>
                ) : (
                    <span className="inline-flex items-center justify-center w-full min-h-32 text-center font-medium text-dark-gray text-lg">
                        There’s no study plan added yet.
                    </span>
                )}
            </Content>

            <Content>
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
                                <div className="flex flex-col justify-center items-center gap-5 min-h-52">
                                    <p className="flex flex-col items-center gap-1">
                                        <span className="text-xl">
                                            Refer the study materials on topic
                                        </span>
                                        <span className="font-medium text-2xl">
                                            Measurement , 1.1 SI Measurement
                                        </span>
                                    </p>
                                    <Button>Mark as Complete</Button>
                                </div>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content>
        </div>
    );
}
