
import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Content from '@/components/content';
import SubHeading from '@/components/headings/sub';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Button as CustomButton } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function submissions() {

    const navigate = useNavigate();

    return (
        <div>
            <Heading>Students</Heading>
            <div className="flex gap-2 px-8 mt-4 bg-white rounded-md">
                <p className="p-4 mx-1 font-medium cursor-pointer hover:border-b-4 hover:border-green-900 hover:scale-95 hover:bg-slate-50" onClick={() => navigate(`/student/profile`)}>
                    Details
                </p>
                <p className="p-4 mx-1 font-medium cursor-pointer hover:border-b-4 hover:border-green-900 hover:scale-95 hover:bg-slate-50">
                    Submissions
                </p>
            </div>

            <Content className="mt-4">
                <SubHeading>Study Plans</SubHeading>

                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <AccordionItem
                                key={`teacher-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={
                                    <div className="flex justify-between">
                                        <span className="text-2xl font-semibold">Task {i + 1}</span>
                                        <span className="text-sm text-slate-600w">
                                            2 PDFs submitted
                                        </span>
                                    </div>
                                }
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content: 'flex flex-col gap-10'
                                }}>
                                <div className="flex flex-col items-center justify-center gap-5 min-h-52">
                                    <p className="flex flex-col items-center gap-1">
                                        <span className="text-medium">
                                            Complete 2021 , 2022 , 2023 AL Physics Past Paper Part
                                            II Question 03 and upload.{' '}
                                        </span>
                                    </p>
                                    <div className="flex items-center justify-center w-full gap-2 p-4 border-2 border-dashed">
                                        {Array.from({ length: 2 }).map((_, j) => {
                                            return (
                                                <a className="flex flex-col items-center gap-4 m-4 text-dark-gray">
                                                    <img
                                                        src="/images/subjects/doc.svg"
                                                        alt="PDF Material"
                                                        className="size-20"
                                                    />
                                                    <span className="block">Answer.pdf</span>
                                                    <CustomButton
                                                        color="default"
                                                        variant="bordered">
                                                        Download
                                                    </CustomButton>
                                                </a>
                                            );
                                        })}
                                    </div>
                                    <textarea
                                        className="w-full mt-2 text-black rounded-md resize-none h-28 bg-slate-200 placeholder-top-left"
                                        placeholder="Give a feedback"
                                    />
                                    <div className="flex justify-end w-full mt-2">
                                        <Button>Add feedback</Button>
                                    </div>
                                </div>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </Content>
        </div>
    );
}
