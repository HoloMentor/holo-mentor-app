import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Heading from '@/components/headings/main';
import { Button } from '@nextui-org/react';
import { Accordion, AccordionItem } from '@nextui-org/react';


const Tasks = [
    {
        id: 1,
        description: 'Do 50 Mcqs on Compiler Theory Complete 2021, 2022, 2023 AL Physics Past Paper Part II Question 03 and upload.'
    },
    {
        id: 1,
        description: 'Do 50 Mcqs on Compiler Theory - Part II Question 04.'
    },
    {
        id: 2,
        description: 'Do 50 Mcqs on Software Project Management'
    },
    {
        id: 3,
        description: 'Do 50 Mcqs on Quality Assurance'
    },
    {
        id: 4,
        description: 'Do 50 Mcqs on Machine Learning'
    }
];

export default function StudyPlanIndividual() {
    const [openItems, setOpenItems] = useState([]);
    const dispatch = useDispatch();

    const handleToggle = (index: number) => {
        setOpenItems((prevOpenItems) => {
            if (prevOpenItems.includes(index)) {
                return prevOpenItems.filter((item: number) => item !== index);
            } else {
                return [...prevOpenItems, index];
            }
        });
    };

    return (
        <>
            <Heading>Forum</Heading>

            <div className="py-6 mb-4 bg-white rounded-md">
                <Accordion variant="splitted" selectionMode="multiple">
                    {Array.from({ length: 4 }).map((_, i) => {
                        const isOpen = openItems.includes(i + 1);

                        return (
                            <AccordionItem
                                key={`task-${i}`}
                                aria-label={`Accordion ${i}`}
                                title={
                                    <div className="flex items-center gap-4 ml-4">
                                        <p className="text-2xl font-semibold">Task</p>
                                        <p className="text-2xl font-semibold">{i + 1}</p>
                                    </div>
                                }
                                className="!shadow-none border border-light-border rounded-lg p-4 py-4"
                                classNames={{
                                    content: 'flex flex-col gap-10'
                                }}
                                onPress={() => handleToggle(i + 1)}
                            >
                                {Tasks.filter(task => task.id === i + 1).map((task) => (
                                    <div key={task.id} className="flex flex-col gap-2">
                                       
                                        <p className='ml-4'>{task.description}</p>
                                    </div>
                                ))}
                            </AccordionItem>
                        );
                    })}
                </Accordion>
                <div className="flex justify-center">
                    <Button className="w-full p-4 py-6 mx-4 my-4" variant="bordered">
                        Add New Task
                    </Button>
                </div>
            </div>
        </>
    );
}