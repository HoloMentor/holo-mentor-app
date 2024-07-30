import Content from '@/components/content';
import Heading from '@/components/headings/main';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function Subjects() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>

            <Content>
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
                                {Array.from({ length: 5 }).map((_, j) => {
                                    return (
                                        <Link
                                            title={'Subject Name'}
                                            key={`subject-${j}`}
                                            to={`/subjects/${j}`}
                                            className="text-black">
                                            <div className="w-full relative rounded-md p-5 border border-light-border">
                                                <span className="font-semibold truncate block max-w-52">
                                                    Physics
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
            </Content>
        </div>
    );
}
