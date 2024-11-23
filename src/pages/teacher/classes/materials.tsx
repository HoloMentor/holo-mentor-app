import Button from '@/components/button';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import SubHeading from '@/components/headings/sub';
import SubTopic, { SubTopicProps, TopicMaterials } from '@/components/subjects/subject/sub-topic';
import useErrorHandler from '@/hooks/error-handler';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import classServices from '@/redux/services/class/class.service';
import classTopicServices from '@/redux/services/class/topics.service';
import { Accordion, AccordionItem, Skeleton, Tooltip } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Materials() {
    const params = useParams();
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
            classId: params.classId,
            materials: true
        },
        {
            skip: !params.classId
        }
    );
    useErrorHandler(isClassTopicsError, classTopicsError);

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
                                        name: modelNames.ADD_MATERIALS,
                                        props: { classId: params.classId }
                                    })
                                )
                            }>
                            Add Materials
                        </Button>
                    </div>
                </div>

                <Accordion
                    disabledKeys={['teacher-skeleton']}
                    variant="splitted"
                    selectionMode="multiple">
                    {isClassTopicsLoading ? (
                        <AccordionItem
                            key={`teacher-skeleton`}
                            aria-label={`Accordion skeleton`}
                            title={
                                <div className="flex items-center gap-4">
                                    <Skeleton className="max-w-60 w-full h-6 rounded-md"></Skeleton>
                                    <h4 className="text-2xl font-semibold w-full max-w-max"></h4>
                                    <div className="relative">
                                        <Skeleton className="rounded-full w-6 h-6"></Skeleton>
                                    </div>
                                </div>
                            }
                            className="!shadow-none border border-light-border rounded-lg p-4"
                            classNames={{
                                content: 'flex flex-col gap-10'
                            }}></AccordionItem>
                    ) : (
                        classTopics?.data?.map(
                            (
                                classTopic: {
                                    id: string;
                                    name: string;
                                    subTopics: SubTopicProps[];
                                },
                                i: number
                            ) => {
                                return (
                                    <AccordionItem
                                        key={`teacher-${classTopic.id}`}
                                        aria-label={`Accordion ${classTopic.id}`}
                                        title={
                                            <div className="flex items-center gap-4">
                                                <h4 className="text-2xl font-semibold w-full max-w-max">
                                                    {classTopic.name}
                                                </h4>
                                                <Tooltip
                                                    style={{
                                                        zIndex: '1'
                                                    }}
                                                    placement="bottom"
                                                    content={
                                                        <div className="flex flex-col gap-3">
                                                            <div
                                                                onClick={() => {
                                                                    dispatch(
                                                                        modelActions.show({
                                                                            name: modelNames.EDIT_TOPIC,
                                                                            props: {
                                                                                topicId:
                                                                                    classTopic.id,
                                                                                name: classTopic.name
                                                                            }
                                                                        })
                                                                    );
                                                                }}
                                                                className="flex gap-2 py-1 px-2 cursor-pointer">
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
                                                                <span>Edit</span>
                                                            </div>
                                                            <div
                                                                onClick={() => {
                                                                    dispatch(
                                                                        modelActions.show({
                                                                            name: modelNames.DELETE_TOPIC,
                                                                            props: {
                                                                                id: classTopic.id
                                                                            }
                                                                        })
                                                                    );
                                                                }}
                                                                className="flex gap-2 py-1 px-2 cursor-pointer">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="size-5 text-danger">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                <span className="text-danger">
                                                                    Delete
                                                                </span>
                                                            </div>
                                                        </div>
                                                    }
                                                    className="relative">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="size-6">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </Tooltip>
                                            </div>
                                        }
                                        className="!shadow-none border border-light-border rounded-lg p-4"
                                        classNames={{
                                            content: 'flex flex-col gap-10'
                                        }}>
                                        {!Array.isArray(classTopic?.subTopics) ? (
                                            <span>No sub topics are found under this topic.</span>
                                        ) : (
                                            classTopic.subTopics.map((classSubTopic, j: number) => {
                                                return (
                                                    <SubTopic
                                                        key={`class-sub-topic-${classTopic.id}-${j}`}
                                                        data={classSubTopic}
                                                    />
                                                );
                                            })
                                        )}

                                        <Button
                                            variant="bordered"
                                            className="border-2 border-gray-200 p-6 border-dashed max-w-full"
                                            onClick={() =>
                                                dispatch(
                                                    modelActions.show({
                                                        name: modelNames.ADD_SUBTOPIC,
                                                        props: {
                                                            topicId: classTopic.id,
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
                        )
                    )}
                </Accordion>

                <Button
                    isDisabled={isClassTopicsLoading}
                    variant="bordered"
                    className="border-2 border-gray-200 p-6 border-dashed max-w-full"
                    onClick={() =>
                        dispatch(
                            modelActions.show({
                                name: modelNames.ADD_TOPIC,
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
