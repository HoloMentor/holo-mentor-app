import Heading from '@/components/heading';
import { Accordion, AccordionItem } from '@nextui-org/react';

export default function Subjects() {
    const defaultContent =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    return (
        <div className="flex flex-col gap-3">
            <Heading>Subjects</Heading>

            <div className="bg-white px-4 py-8 rounded-ss-md rounded-es-md">
                <Accordion variant="splitted" selectionMode="multiple">
                    <AccordionItem
                        key="1"
                        aria-label="Accordion 1"
                        title={<span className="text-2xl font-semibold">According 1</span>}
                        className="!shadow-none border border-light-border rounded-lg p-4">
                        <div className="max-w-[400px] w-full relative rounded-md p-5 border border-light-border">
                            <span className="font-semibold">Biology 2023-Theory</span>
                            <img
                                src="/images/subjects/book.svg"
                                alt="Book"
                                className="absolute right-0 bottom-0"
                            />
                        </div>
                    </AccordionItem>
                    <AccordionItem
                        key="2"
                        aria-label="Accordion 1"
                        title={<span className="text-2xl font-semibold">According 1</span>}
                        className="!shadow-none border border-light-border rounded-lg p-4">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        key="3"
                        aria-label="Accordion 1"
                        title={<span className="text-2xl font-semibold">According 1</span>}
                        className="!shadow-none border border-light-border rounded-lg p-4">
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
