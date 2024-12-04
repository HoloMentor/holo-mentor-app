import Button from '@/components/button';
import Heading from '@/components/headings/main';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ForumQuestionVote from '@/components/forum/vote';
import forumServices from '@/redux/services/forum.service';
import useErrorHandler from '@/hooks/error-handler';
import Reader from '@/components/editor/reader';
import classTopicServices from '@/redux/services/class/topics.service';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import voteServices from '@/redux/services/vote.service';

export default function Forum() {
    const location = useLocation();
    const { classId } = useParams();
    const { user } = useSelector((state: IRootState) => state.user);

    const passingUserId = user?.userId;

    const {
        data: classTopics,
        error: classTopicsError,
        isError: isClassTopicsError
    } = classTopicServices.useGetClassTopicsQuery(
        {
            classId: classId,
            materials: false
        },
        {
            skip: !classId
        }
    );
    useErrorHandler(isClassTopicsError, classTopicsError);

    const classTopicsData = useMemo(() => {
        return (
            classTopics?.data?.map((topic: { id: number | string; name: string }) => ({
                value: topic.id,
                label: topic.name
            })) || []
        );
    }, [classTopics]);
    console.log(classTopicsData);

    const {
        data: forumQuestions,
        error: forumQuestionsError,
        isError: isForumQuestionsError
    } = forumServices.useGetQuestionsQuery(
        {
            classId: classId,
            materials: false
        },
        {
            skip: !classId
        }
    );
    useErrorHandler(isForumQuestionsError, forumQuestionsError);

    console.log('forum questions', forumQuestions);

    function QuestionVoteCount({
        questionId,
        userId
    }: {
        questionId: number;
        userId: string | number;
    }) {
        const { data: voteData, isLoading, error } = voteServices.useGetVotesQuery(questionId);

        console.log('vote data', voteData);

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error loading votes</div>;

        return (
            <ForumQuestionVote
                id={questionId}
                voteCount={voteData?.totalVotes || 0}
                userId={userId}
            />
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>

            <section className="flex items-center justify-between gap-5 pr-5">
                <div className="w-full max-w-36"></div>
                <div className="flex items-center gap-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
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
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                className="text-center text-black"
                                key="new"
                                href={`${location.pathname}/mcq`}>
                                MCQ
                            </DropdownItem>
                            <DropdownItem
                                className="text-center text-black"
                                key="copy"
                                href={`${location.pathname}/essay`}>
                                Normal Question
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </section>

            <section className="flex flex-col gap-5 pr-5">
                {forumQuestions?.data?.map(
                    (
                        _: {
                            id: number;
                            question: any;
                            subTopic: number;
                            voteCount: number;
                            userId: number;
                            firstName: string;
                            lastName: string;
                        },
                        i: number
                    ) => {
                        const topicNumber = Number(_.subTopic);
                        const topic = classTopicsData.find(
                            (topic: { value: number }) => topic.value === topicNumber
                        );
                        console.log(typeof _.subTopic);
                        console.log(topic);

                        return (
                            <div key={_.id} className="flex gap-3 p-6 bg-white rounded-md">
                                <QuestionVoteCount
                                    questionId={_.id}
                                    userId={String(passingUserId)}
                                />
                                <Link
                                    to={`${location.pathname}/${_.id}`}
                                    className="flex flex-col w-full gap-6 text-black hover:text-black">
                                    <h3 className="text-lg font-semibold">
                                        {topic ? topic.label : 'Unknown Topic'}
                                    </h3>
                                    <Reader value={_.question} />
                                </Link>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex items-center justify-end gap-2 w-36">
                                                <img
                                                    className="rounded-full size-7"
                                                    src="/images/student/avatar.png"
                                                    alt="Avatar"
                                                />
                                                <span className="text-xs truncate">
                                                    {_.firstName + ' ' + _.lastName}
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`${location.pathname}/${_.id}`}
                                            className="flex items-center justify-end gap-2 text-dark-gray"></Link>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </section>
        </div>
    );
}
