import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '@/components/headings/main';

const Tasks = [
    {
        id: 1,
        description:
            'Do 50 Mcqs on Compiler Theory Complete 2021 , 2022 , 2023 AL Physics Past Paper Part II Question 03 and upload.Physics Past Paper Part II Question 03 and upload'
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
    }
];



export default function StudyPlanIndividual() {
    const [visibleTasks, setVisibleTasks] = useState<{ [key: number]: boolean }>({});
    const navigate = useNavigate();

    const toggleTaskVisibility = (id: number) => {
        setVisibleTasks((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleAddNewTask = () => {
        navigate('/add-task');
    };

    return (
        <>
            <Heading>Forum</Heading>

            <div className="bg-white rounded-md">
                {Tasks.map((task) => (
                    <div className="m-4 rounded-md border-1 shadow-custom">
                        <div className="flex items-center gap-4 p-4 pl-8 m-4 ">
                            <img
                                src="/images/arrow-left.svg"
                                className="w-4.5 h-3 al cursor-pointer"
                                onClick={() => toggleTaskVisibility(task.id)}></img>
                            <p className="ml-4 text-xl font-medium">Task {task.id}</p>
                            <img
                                src="/images/pencil-alt.svg"
                                className="cursor-pointer"
                                >
                                </img>
                        </div>

                        {visibleTasks[task.id] && (
                            <div className="flex justify-center pb-2 m-2 border-2 rounded-md">
                                <p className="pl-4 m-4 ml-8">{task.description}</p>
                            </div>
                        )}
                    </div>
                ))}
                <div
                    onClick={handleAddNewTask}
                    className="flex items-center justify-center gap-4 p-4 mb-4 ml-6 mr-4 transition-all duration-300 border-2 cursor-pointer rounded-3xl hover:shadow-md hover:bg-gray-100 active:bg-gray-200 active:shadow-inner ">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 13.75V20M20 20V26.25M20 20H26.25M20 20H13.75M38.75 20C38.75 22.4623 38.265 24.9005 37.3227 27.1753C36.3805 29.4502 34.9993 31.5172 33.2583 33.2583C31.5172 34.9993 29.4502 36.3805 27.1753 37.3227C24.9005 38.265 22.4623 38.75 20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2583C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 15.0272 3.22544 10.2581 6.74175 6.74175C10.2581 3.22544 15.0272 1.25 20 1.25C24.9728 1.25 29.7419 3.22544 33.2583 6.74175C36.7746 10.2581 38.75 15.0272 38.75 20Z"
                            stroke="#6A6A6A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <p className="text-slate-400">Add New Task</p>
                </div>
            </div>
        </>
    );
}
