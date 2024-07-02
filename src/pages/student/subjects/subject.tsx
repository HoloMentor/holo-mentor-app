import Heading from '@/components/heading';
import SubTopic from '@/components/subjects/subject/sub-topic';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Subject() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Subject</Heading>

            <div className="bg-white px-4 py-8 rounded-ss-md rounded-es-md">
                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={<span className="text-2xl font-semibold">Measurement</span>}
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
            </div>
        </div>
    );
}
