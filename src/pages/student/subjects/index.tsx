import Heading from '@/components/heading';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function Subjects() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>

            <div className="bg-white px-4 py-8 rounded-ss-md rounded-es-md">
                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={<span className="text-2xl font-semibold">Teacher {i}</span>}
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content:
                                        'grid gap-4 grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1'
                                }}>
                                {Array.from({ length: 6 }).map((_, j) => {
                                    return (
                                        <Link
                                            key={`subject-${j}`}
                                            to={`/subjects/${j}`}
                                            className="text-black">
                                            <div className="w-full relative rounded-md p-5 border border-light-border">
                                                <span className="font-semibold truncate">
                                                    Subject {j}
                                                </span>
                                                <img
                                                    src="/images/subjects/book.svg"
                                                    alt="Book"
                                                    className="absolute right-0 bottom-0 opacity-50"
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </div>
    );
}