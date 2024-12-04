import Content from '@/components/content';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
// import SubTopic, { SubTopicProps } from '@/components/subjects/subject/sub-topic';
import SubTopic from '@/components/subjects/subject/sub-topic';
import useErrorHandler from '@/hooks/error-handler';
import classTopicServices from '@/redux/services/class/topics.service';
import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
import { useParams } from 'react-router-dom';

// import { IRootState } from '@/redux';
// import { useSelector } from 'react-redux';
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

interface Topic {
    id: number;
    name: string;
    instituteId: number;
    classId: number;
    createdAt: string | null;
    subTopics: SubTopic[];
}

interface SubTopic {
    id: number;
    name: string;
    isDone: boolean;
    materials: any | null;
}

export default function Subject() {
    // const { user } = useSelector((state: IRootState) => state.user);
    const { subjectId } = useParams<{ subjectId: string }>();

    const {
        data: classTopics,
        isError: isClassTopicsError,
        error: classTopicsError,
        isLoading: isClassTopicsLoading
    } = classTopicServices.useGetClassTopicsQuery(
        {
            classId: parseInt(subjectId),
            materials: true
        },
        {
            skip: !subjectId
        }
    );
    useErrorHandler(isClassTopicsError, classTopicsError);
    // console.log(classTopics, 'classTopics', subjectId);

    return isClassTopicsLoading ? (
        <div className="flex flex-col gap-3">
            <Heading>Subject</Heading>

            <Content>
                <SubHeading>Topics</SubHeading>

                <div className="grid justify-between grid-cols-1 gap-6 pr-4">
                    {Array.from({ length: 3 }).map((_, index) => {
                        return (
                            <div
                                key={`loading-skeleton-${index}`}
                                className="w-full flex items-center gap-3 py-6">
                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Content>
        </div>
    ) : (
        <div className="flex flex-col gap-3">
            <Heading>Subject</Heading>

            <Content>
                <SubHeading>Topics</SubHeading>

                <Accordion variant="splitted" selectionMode="multiple">
                    {isClassTopicsLoading ? (
                        <AccordionItem
                            key="loading"
                            aria-label="Loading"
                            title={
                                <div className="flex items-center gap-4">
                                    <Skeleton className="max-w-60 w-full h-6 rounded-md" />
                                </div>
                            }
                            className="!shadow-none border border-light-border rounded-lg p-4"
                        />
                    ) : (
                        classTopics?.data?.map((topic: Topic) => (
                            <AccordionItem
                                key={`topic-${topic.id}`}
                                aria-label={`Topic ${topic.name}`}
                                title={<span className="text-2xl font-semibold">{topic.name}</span>}
                                className="!shadow-none border border-light-border rounded-lg p-4"
                                classNames={{
                                    content: 'flex flex-col gap-10'
                                }}>
                                {!Array.isArray(topic.subTopics) ? (
                                    <span>No sub topics are found under this topic.</span>
                                ) : (
                                    topic.subTopics.map((subTopic: SubTopic) => (
                                        <SubTopic
                                            key={`sub-topic-${subTopic.id}`}
                                            data={{
                                                id: subTopic.id.toString(),
                                                name: subTopic.name,
                                                isDone: subTopic.isDone,
                                                materials: subTopic.materials
                                                    ? subTopic.materials
                                                    : null
                                            }}
                                            hideOptions={true}
                                        />
                                    ))
                                )}
                            </AccordionItem>
                        ))
                    )}
                </Accordion>
            </Content>
        </div>
    );
}
