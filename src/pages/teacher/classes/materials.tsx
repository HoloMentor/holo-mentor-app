import Button from '@/components/button';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import SubTopic from '@/components/subjects/subject/sub-topic';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Materials() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Sasip 2023</Heading>

            <Content>
                <div className="flex justify-between">
                    <SubHeading>Topics</SubHeading>
                    <div className="space-x-2">
                        <Button
                            variant="bordered"
                            className="border-2 text-dark-green border-dark-green">
                            Upload Marks
                        </Button>
                        <Button>Add Materials</Button>
                    </div>
                </div>

                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-semibold">Measurement</span>
                                        <div className="relative">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-5">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                }
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content: 'flex flex-col gap-10'
                                }}>
                                {Array.from({ length: 2 }).map((_, j) => (
                                    <SubTopic key={`sub-topic-${j}`} />
                                ))}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content>
        </div>
    );
}
