import Heading from '@/components/headings/main';
import Content from '@/components/content';

export default function QuizInfo() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <Content className="py-20 my-4 shadow-lg max-md:px-6">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-8 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">Measurement</h3>
                    <p>
                        Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                        accumsan, Torem ipsum dolor sit amet,
                    </p>

                    <div className="!shadow-none border border-light-border rounded-lg p-10">
                        <div className="flex flex-col gap-10 pb-4">
                            {Array.from({ length: 10 }).map((_, qIndex) => (
                                <div key={qIndex} className="flex flex-col gap-6">
                                    <div>
                                        <span className="font-semibold">Q No : {qIndex + 1}</span>
                                    </div>
                                    <p className="pl-4">
                                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                                        dignissim, metus nec fringilla accumsan, Torem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie, dictum est a, mattis tellus. Sed dignissim, metus
                                        nec fringilla accumsan, Torem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                    </p>
                                    <div className="flex flex-col pl-8 gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                className="text-lime-600"
                                                type="radio"
                                                name={`q${qIndex}`}
                                                id={`q${qIndex}a`}
                                                disabled
                                                checked
                                            />
                                            <label
                                                className="text-lime-600"
                                                htmlFor={`q${qIndex}a`}>
                                                Torem ipsum dolor sit amet, consectetur
                                            </label>
                                        </div>
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name={`q${qIndex}`}
                                                    id={`q${qIndex}b-${i}`}
                                                    disabled
                                                />
                                                <label htmlFor={`q${qIndex}b-${i}`}>
                                                    Torem ipsum dolor sit amet, consectetur
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Content>
        </div>
    );
}
