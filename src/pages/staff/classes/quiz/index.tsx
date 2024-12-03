import Button from '@/components/button';
import Heading from '@/components/headings/main';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SubjectQuiz() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = () => navigate(`${location.pathname}/add`);
    const handleQuizView = () => navigate(`${location.pathname}/view`);

    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <section className="flex items-center justify-end gap-5 pr-5">
                <div className="flex flex-row justify-end gap-2">
                    <div className="flex gap-2">
                        <Button className="flex items-center gap-2" onClick={handleQuizView}>
                            Quiz Bank
                        </Button>
                    </div>
                    <Button
                        onClick={handleNavigate}
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

            <section className="flex flex-col gap-5 pr-5 mx-10 mt-10">
                {Array.from({ length: 5 }).map((_, i) => {
                    const id = i;

                    return (
                        <div
                            key={i}
                            className="flex justify-between gap-3 p-6 bg-white rounded-md shadow-sm max-md:flex-col">
                            <div className="flex flex-col gap-1 text-black hover:text-black max-md:text-sm">
                                <h3 className="text-lg font-semibold">Measurement</h3>
                                <div>50 MCQs</div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center h-full max-md:justify-start">
                                    <Link to={`${location.pathname}/${id}`}>
                                        <Button className="flex items-center gap-2 text-white rounded-lg bg-dark-green hover:border-dark-green border-1 hover:bg-white hover:text-dark-green ">
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
