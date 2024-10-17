import Button from '@/components/button';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import SubTopic, { SubTopicProps } from '@/components/subjects/subject/sub-topic';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import classServices from '@/redux/services/class.service';
import { useParams } from 'react-router-dom';
import useErrorHandler from '@/hooks/error-handler';
import classTopicServices from '@/redux/services/class-topics/topics.service';
import ClassTopicContent from '@/components/subjects/subject/content';

export default function Materials() {
    const params = useParams();
    const [openItems, setOpenItems] = useState([]);
    const dispatch = useDispatch();

    /* get class data */
    const {
        data: classData,
        isLoading: isClassLoading,
        error: classError,
        isError: isClassError
    } = classServices.useGetQuery(
        {
            id: params.classId
        },
        {
            skip: !params.classId
        }
    );
    useErrorHandler(isClassError, classError);

    /* get class topics */
    const {
        data: classTopics,
        isLoading: isClassTopicsLoading,
        error: classTopicsError,
        isError: isClassTopicsError
    } = classTopicServices.useGetClassTopicsQuery(
        {
            classId: params.classId
        },
        {
            skip: !params.classId
        }
    );
    useErrorHandler(isClassTopicsError, classTopicsError);

    const handleToggle = (index: number) => {
        setOpenItems((prev) => {
            if (prev.includes(index)) {
                return prev.filter((item) => item !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    return (
        <div className="flex flex-col gap-3">
            <Heading isLoading={isClassLoading}>{classData?.data.className}</Heading>

            <Content>
                <div className="flex justify-between">
                    <SubHeading>Topics</SubHeading>
                    <div className="space-x-2">
                        <Button
                            onClick={() =>
                                dispatch(
                                    modelActions.show({
                                        name: modelNames.ADD_MATERIALS
                                    })
                                )
                            }>
                            Add Materials
                        </Button>
                    </div>
                </div>

                <Accordion variant="splitted" selectionMode="multiple">
                    {classTopics?.data?.map(
                        (
                            classData: {
                                id: string;
                                name: string;
                                subTopics: SubTopicProps[];
                            },
                            i: number
                        ) => {
                            return (
                                <AccordionItem
                                    key={`teacher-${classData.id}`}
                                    aria-label={`Accordion ${classData.id}`}
                                    title={
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-2xl font-semibold w-full max-w-max">
                                                {classData.name}
                                            </h4>
                                            <div className="relative">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-5">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    }
                                    className="!shadow-none border border-light-border rounded-lg p-4"
                                    classNames={{
                                        content: 'flex flex-col gap-10'
                                    }}
                                    onPress={() => handleToggle(i)}>
                                    <ClassTopicContent open={openItems.includes(i)} />

                                    <Button
                                        variant="bordered"
                                        className="border-2 border-gray-200 p-6 border-dashed max-w-full"
                                        onClick={() =>
                                            dispatch(
                                                modelActions.show({
                                                    name: modelNames.ADD_NEW_SUB_TOPIC,
                                                    props: {
                                                        topicId: classData.id,
                                                        classId: params.classId
                                                    }
                                                })
                                            )
                                        }>
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M20 13.75V20M20 20V26.25M20 20H26.25M20 20H13.75M38.75 20C38.75 22.4623 38.265 24.9005 37.3227 27.1753C36.3805 29.4502 34.9993 31.5172 33.2583 33.2583C31.5172 34.9993 29.4502 36.3805 27.1753 37.3227C24.9005 38.265 22.4623 38.75 20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2583C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 15.0272 3.22544 10.2581 6.74175 6.74175C10.2581 3.22544 15.0272 1.25 20 1.25C24.9728 1.25 29.7419 3.22544 33.2583 6.74175C36.7746 10.2581 38.75 15.0272 38.75 20Z"
                                                stroke="#6A6A6A"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <p className="text-slate-400">Add New Sub Topic</p>
                                    </Button>
                                </AccordionItem>
                            );
                        }
                    )}
                </Accordion>
                <Button
                    variant="bordered"
                    className="border-2 border-gray-200 p-6 border-dashed max-w-full"
                    onClick={() =>
                        dispatch(
                            modelActions.show({
                                name: modelNames.ADD_NEW_TOPIC,
                                props: { classId: params.classId }
                            })
                        )
                    }>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 13.75V20M20 20V26.25M20 20H26.25M20 20H13.75M38.75 20C38.75 22.4623 38.265 24.9005 37.3227 27.1753C36.3805 29.4502 34.9993 31.5172 33.2583 33.2583C31.5172 34.9993 29.4502 36.3805 27.1753 37.3227C24.9005 38.265 22.4623 38.75 20 38.75C17.5377 38.75 15.0995 38.265 12.8247 37.3227C10.5498 36.3805 8.48285 34.9993 6.74175 33.2583C5.00065 31.5172 3.61953 29.4502 2.67726 27.1753C1.73498 24.9005 1.25 22.4623 1.25 20C1.25 15.0272 3.22544 10.2581 6.74175 6.74175C10.2581 3.22544 15.0272 1.25 20 1.25C24.9728 1.25 29.7419 3.22544 33.2583 6.74175C36.7746 10.2581 38.75 15.0272 38.75 20Z"
                            stroke="#6A6A6A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <p className="text-slate-400">Add New Topic</p>
                </Button>
            </Content>
        </div>
    );
}
