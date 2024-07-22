import Button from '@/components/button';
import Heading from '@/components/headings/main';

import Content from '@/components/content';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function QuizInfo() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <Content className="py-20 my-4 shadow-lg max-md:px-6">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-8 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">Quiz Name</h3>
                    <p>
                        Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                        accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                        turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                        fringilla accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                    </p>

                    <Button className="flex mx-auto items-center gap-2 rounded-lg border-1 hover:bg-white hover:text-dark-green hover:border-dark-green">
                        Re Attempt
                    </Button>

                    <h4 className="font-semibold text-xl">Previous Attempts</h4>

                    <Accordion variant="splitted" selectionMode="multiple">
                        {Array.from({ length: 3 }).map((_, i) => {
                            return (
                                <AccordionItem
                                    key={`teacher-${i}`}
                                    aria-label={`Accordion ${i}`}
                                    title={
                                        <div className="text-sm flex gap-4 justify-between items-center">
                                            <div>
                                                <div className="text-lg font-semibold text-dark-green">
                                                    Finished
                                                </div>
                                                Submitted Friday, 16 February 2024, 11:11 AM
                                            </div>
                                            <div className="font-semibold">Marks : 8/10</div>
                                        </div>
                                    }
                                    className="!shadow-none border border-light-border rounded-lg p-0"
                                    classNames={{
                                        content: 'flex flex-col gap-10'
                                    }}>
                                    <div className="pb-4">
                                        <div className="flex flex-col gap-6">
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
                                                Torem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Etiam eu turpis molestie, dictum est a, mattis
                                                tellus. Sed dignissim, metus nec fringilla accumsan,
                                                Torem ipsum dolor sit amet, consectetur adipiscing
                                                elit. Etiam eu turpis molestie, dictum est a, mattis
                                                tellus. Sed dignissim, metus nec fringilla accumsan,
                                                Torem ipsum dolor sit amet, consectetur adipiscing
                                                elit.
                                            </p>

                                            <div className="flex flex-col pl-8 gap-2">
                                                {/* correct sample */}
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

                                                {/* incorrect sample */}
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
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                name="q1"
                                                                id={`q1b-${i}`}
                                                                disabled
                                                            />
                                                            <label htmlFor={`q1b-${i}`}>
                                                                Torem ipsum dolor sit amet,
                                                                consectetur
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </Content>
        </div>
    );
}
