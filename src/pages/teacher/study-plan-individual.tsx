import React, { useState } from 'react';

interface Task {
    id: number;
    description: string;
}

const Tasks = [
    {
        id: 1,
        description: 'Do 50 Mcqs on Compiler Theory'
    },
    {
        id: 2,
        description: 'Do 50 Mcqs on Sowtware Project Management'
    },
    {
        id: 3,
        description: 'Do 50 Mcqs on S.qaulity assuarance'
    },
    {
        id: 4,
        description: 'Do 50 Mcqs on Machine Learning'
    },
    {
        id: 5,
        description: 'Do 50 Mcqs on Computer Graphics'
    }
];

export default function StudyPlanIndividual() {
    const [visibleTasks, setVisibleTasks] = useState<{ [key: number]: boolean }>({});

    const toggleTaskVisibility = (id: number) => {
        setVisibleTasks((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="bg-white rounded-md">
            {Tasks.map((task) => (
                <div className="m-4 rounded-md border-1 shadow-custom">
                    <div className="flex items-center gap-4 p-4 pl-8 m-4 ">
                        <img
                            src="/images/teacher/ArrowFaceDown.png"
                            className="w-4.5 h-3 al cursor-pointer"
                            onClick={() => toggleTaskVisibility(task.id)}></img>
                        <p className="ml-4 text-2xl font-medium">Task {task.id}</p>
                        <img src="/images/teacher/PencilAlt.png" className="w-6 h-6 ml-8 "></img>
                    </div>
                    {visibleTasks[task.id] && <p className="pl-4 m-4 ml-8">{task.description}</p>}
                </div>
            ))}
        </div>
    );
}
