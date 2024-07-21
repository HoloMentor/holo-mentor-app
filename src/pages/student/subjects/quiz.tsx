import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import Select, { SelectValue } from '@/components/select';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const filterOptions = [
    {
        value: 'top',
        label: 'Top'
    }
];

export default function SubjectQuiz() {
    const location = useLocation();
    const [filterValue, setFilterValue] = useState<SelectValue>('top');
    const [fillColors, setFillColors] = useState(Array(5).fill('#B1B1B1')); // Initial color green

    const toggleFillColor = (index: number) => {
        setFillColors((prevColors) =>
            prevColors.map((color, i) =>
                i === index ? (color === '#B1B1B1' ? '#FFC107' : '#B1B1B1') : color
            )
        );
    };
    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <section className="flex items-center justify-between gap-5 pr-5">
                <div className="w-full max-w-36">
                    <Select options={filterOptions} value={filterValue} onChange={setFilterValue} />
                </div>
                <div className="flex items-center gap-2">
                    <Input placeholder="Search" />
                </div>
            </section>

            <section className="flex flex-col gap-5 pr-5 mb-8">
                {Array.from({ length: 1 }).map((_, i) => {
                    const id = i;

                    return (
                        <div
                            key={i}
                            className="flex justify-between gap-3 bg-white rounded-md p-6 shadow-lg max-md:flex-col">
                            <Link
                                to={`${location.pathname}/attempt/${id}`}
                                className="flex flex-col gap-1 text-black hover:text-black max-md:text-sm">
                                <h3 className="font-semibold text-lg">Quiz Name</h3>
                                <div>
                                    Status:{' '}
                                    <span
                                        className="bg-[#489F2D] border-green-200 text-white
                                    ml-1 px-2 py-1 rounded-md text-sm">
                                        Active
                                    </span>
                                </div>
                                <div>Publish Date : 21 December 2023</div>
                            </Link>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center items-center h-full max-md:justify-start">
                                    <svg
                                        className="me-2 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="23"
                                        viewBox="0 0 23 23"
                                        fill={fillColors[i]}
                                        onClick={() => toggleFillColor(i)}>
                                        <path
                                            d="M11.7004 17.1268L15.6775 19.5322C16.4058 19.973 17.2971 19.3214 17.1054 18.4972L16.0513 13.9739L19.5683 10.9264C20.2104 10.3705 19.8654 9.31635 19.0221 9.24927L14.3933 8.85635L12.5821 4.58219C12.2563 3.80594 11.1446 3.80594 10.8188 4.58219L9.0075 8.84677L4.37875 9.23969C3.53542 9.30677 3.19042 10.3609 3.8325 10.9168L7.34958 13.9643L6.29542 18.4876C6.10375 19.3118 6.995 19.9634 7.72333 19.5226L11.7004 17.1268Z"
                                            fill={fillColors[i]}
                                        />
                                    </svg>

                                    <Link to={`${location.pathname}/attempt/${id}`}>
                                        <Button className="flex items-center gap-2 rounded-lg border-1 hover:bg-white hover:text-dark-green hover:border-dark-green">
                                            Answer Questions
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
            <section className="flex flex-col gap-5 pr-5">
                {Array.from({ length: 5 }).map((_, i) => {
                    const id = i;

                    return (
                        <div
                            key={i}
                            className="flex justify-between gap-3 bg-white rounded-md p-6 shadow-lg max-md:flex-col">
                            <Link
                                to={`${location.pathname}/${id}`}
                                className="flex flex-col gap-1 text-black hover:text-black max-md:text-sm">
                                <h3 className="font-semibold text-lg">Quiz Name</h3>
                                <div>
                                    Status:{' '}
                                    <span
                                        className="bg-dark-green border-green-200 text-white
                                    ml-1 px-2 py-1 rounded-md text-sm">
                                        Completed
                                    </span>
                                </div>
                                <div>Publish Date : 21 December 2023</div>
                            </Link>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center items-center h-full max-md:justify-start">
                                    <svg
                                        className="me-2 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="23"
                                        height="23"
                                        viewBox="0 0 23 23"
                                        fill={fillColors[i]}
                                        onClick={() => toggleFillColor(i)}>
                                        <path
                                            d="M11.7004 17.1268L15.6775 19.5322C16.4058 19.973 17.2971 19.3214 17.1054 18.4972L16.0513 13.9739L19.5683 10.9264C20.2104 10.3705 19.8654 9.31635 19.0221 9.24927L14.3933 8.85635L12.5821 4.58219C12.2563 3.80594 11.1446 3.80594 10.8188 4.58219L9.0075 8.84677L4.37875 9.23969C3.53542 9.30677 3.19042 10.3609 3.8325 10.9168L7.34958 13.9643L6.29542 18.4876C6.10375 19.3118 6.995 19.9634 7.72333 19.5226L11.7004 17.1268Z"
                                            fill={fillColors[i]}
                                        />
                                    </svg>

                                    <Link to={`${location.pathname}/${id}`}>
                                        <Button className="flex items-center gap-2 rounded-lg bg-white text-dark-green border-dark-green border-1 hover:bg-dark-green hover:text-white hover:border-dark-green">
                                            View Answers
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
