import Heading from '@/components/headings/main';
import Content from '@/components/content';
import { Link, useLocation } from 'react-router-dom';

export default function QuizQuestion() {
    let location = useLocation().pathname;
    let quizId = Number(location.match(/\d+$/)[0]);
    let next_url = location.replace(/\d+$/, (quizId + 1).toString());
    let prev_url = location.replace(/\d+$/, (quizId - 1).toString());
    console.log(next_url);
    console.log(prev_url);
    if (quizId === 0) prev_url = location;

    return (
        <div className="flex flex-col gap-3">
            <Heading>Attempt Quiz</Heading>

            <Content className=" my-4 shadow-lg min-h-full py-10 ">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-2 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">Quiz Name</h3>
                    <h4 className="font-semibold text-xl">Question 0{quizId + 1}</h4>

                    <p className="pb-4">
                        Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                        accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                        turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                        fringilla accumsan, Torem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <div className="flex flex-col pl-4 gap-2">
                        {Array.from({ length: 5 }).map((_, i) => {
                            return (
                                <div key={i} className="flex items-center gap-2">
                                    <input type="radio" name="q1" id={`q1b-${i}`} />
                                    <label htmlFor={`q1b-${i}`}>
                                        Torem ipsum dolor sit amet, consectetur
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* pagination btns */}
                <div className="flex justify-center mt-4t">
                    <Link
                        to={prev_url}
                        className={`px-4 py-2 rounded-xl mr-2 text-3xl font-extralight bg-gray-200 text-dark-green 
                            ${quizId === 0 ? 'cursor-not-allowed' : ''}`}>
                        &lt;
                    </Link>
                    <Link
                        to={next_url}
                        className="px-4 py-2 rounded-xl text-3xl font-extralight bg-dark-green text-white hover:text-white">
                        &gt;
                    </Link>
                </div>
            </Content>
        </div>
    );
}
