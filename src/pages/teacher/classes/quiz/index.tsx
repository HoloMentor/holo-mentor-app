import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import { useState } from 'react';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export default function SubjectQuiz() {
    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <section className="flex items-center justify-end gap-5 pr-5">
                <div className="flex justify-end flex-row gap-2">
                    <div className="flex gap-2">
                        <Input placeholder="Search" />
                    </div>
                    <Button
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_MCQ
                                })
                            )
                        }
                        className="flex items-center gap-2"
                        endContent={
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        }>
                        Add New
                    </Button>
                </div>
            </section>

            <section className="flex flex-col gap-5 pr-5 mt-10 mx-10">
                {Array.from({ length: 5 }).map((_, i) => {
                    const id = i;

                    return (
                        <div
                            key={i}
                            className="flex justify-between gap-3 bg-white rounded-md p-6 shadow-sm max-md:flex-col">
                            <div className="flex flex-col gap-1 text-black hover:text-black max-md:text-sm">
                                <h3 className="font-semibold text-lg">Measurement</h3>
                                <div>50 MCQs</div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center items-center h-full max-md:justify-start">
                                    <Link to={`${location.pathname}/${id}`}>
                                        <Button className="flex bg-dark-green items-center gap-2 rounded-lg text-white hover:border-dark-green border-1 hover:bg-white hover:text-dark-green ">
                                            View Qestions
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
