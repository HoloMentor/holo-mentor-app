import Content from '@/components/content';
import Heading from '@/components/headings/main';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import classTopicServices from '@/redux/services/class/topics.service';
import useErrorHandler from '@/hooks/error-handler';

function ClassProgress() {
    const location = useLocation();
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const url = window.location.pathname;
    const classId = url.split('/')[2];

    const {
        data: classTopics,
        isLoading: topicLoading,
        isError: isTopicError,
        error: topicError
    } = classTopicServices.useGetClassTopicsQuery(
        {
            classId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !classId
        }
    );
    useErrorHandler(isTopicError, topicError);

    console.log(classTopics);

    return (
        <div className="flex flex-col gap-3">
            <Heading>Class Progress</Heading>
            <Content>
                <Accordion variant="splitted" selectionMode="multiple">
                    {classTopics?.data?.map(
                        (topic: {
                            id: string;
                            name: string;
                            subTopics: { id: string; name: string; isDone: boolean }[];
                        }) => (
                            <AccordionItem
                                key={topic.id}
                                aria-label={`Accordion ${topic.id}`}
                                title={<span className="text-2xl font-semibold">{topic.name}</span>}
                                className="!shadow-none border border-light-border rounded-lg p-4">
                                {topic.subTopics?.length > 0 ? (
                                    topic.subTopics.map(
                                        (subTopic: {
                                            id: string;
                                            name: string;
                                            isDone: boolean;
                                        }) => (
                                            <div
                                                key={subTopic.id}
                                                className="w-full relative rounded-md p-5 border border-light-border mb-3 flex items-center">
                                                {subTopic.isDone === true ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-green-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-red-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                )}
                                                <span className="ml-4">{subTopic.name}</span>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="text-gray-500">No subtopics available.</div>
                                )}
                            </AccordionItem>
                        )
                    )}
                </Accordion>
            </Content>
        </div>
    );
}

export default ClassProgress;
