import Content from '@/components/content';
import Heading from '@/components/headings/main';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function classProgress() {
  return (
      <div className="flex flex-col gap-3">
            <Heading>Class Progress</Heading>
            <Content>
                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={<span className="text-2xl font-semibold">Topic {i + 1}</span>}
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                >
                                {Array.from({ length: 4 }).map((_, j) => {
                                    return (
                                        <Link
                                            title={'Subject Name'}
                                            key={`subject-${j}`}
                                            to={`/subjects/${j}`}
                                            className="text-black">
                                            <div className="w-full relative rounded-md p-5 border border-light-border mb-3">
                                                <span>
                                                   Sub Topic  {i + 1 }.{j}
                                                </span>
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

export default classProgress;