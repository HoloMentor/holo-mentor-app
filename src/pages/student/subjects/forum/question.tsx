import Button from '@/components/button';
import ForumQuestionReplyForm from '@/components/forum/reply-form';
import Heading from '@/components/headings/main';
import useErrorHandler from '@/hooks/error-handler';
import forumServices from '@/redux/services/forum.service';
import { IRootState } from '@/redux';
import {
    Button as NextUIButton,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    User
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Reader from '@/components/editor/reader';
import { useSelector, useDispatch } from 'react-redux';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import commentServices from '@/redux/services/forum.comment.service';

export default function ForumPage() {
    const [onReplyAll, setOnReplyAll] = useState(null);
    const params = useParams();
    const { user } = useSelector((state: IRootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    console.log('Here are the parameters\n', params);
    const forumId = params.forumId;

    const {
        data: commentData,
        error: commentError,
        isError: isCommentError
    } = commentServices.useGetCommentQuery(forumId);
    useErrorHandler(isCommentError, commentError);
    console.log('Here comments data', commentData);

    const [getSingleQuestion, { data, error, isError }] =
        forumServices.useGetSingleQuestionMutation();

    useEffect(() => {
        const fetchQuestion = async () => {
            if (!forumId) return;

            try {
                const result = await getSingleQuestion(forumId).unwrap();
                console.log('Question data:', result);
            } catch (err) {
                console.error('Error fetching question:', err);
            }
        };

        fetchQuestion();
    }, [forumId, getSingleQuestion]);

    useErrorHandler(isError, error);

    console.log(data);
    const question = data?.data?.question;
    const mcqAnswers = data?.data?.mcqAnswer;
    const userID = data?.data?.userId;
    const currentUserId = user?.userId;
    const questionID = Number(forumId);
    console.log('Question ID:', questionID);

    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>
            <div className="flex gap-5 p-6 bg-white rounded-md">
                <div className="flex flex-col w-full gap-5">
                    <div className="flex justify-between w-full">
                        <User
                            name={user?.firstName + ' ' + user?.lastName}
                            avatarProps={{
                                src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                            }}
                        />

                        {userID == currentUserId && (
                            <>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <NextUIButton
                                            isIconOnly
                                            className="rounded-full !size-7 !min-w-7">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="size-5">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </NextUIButton>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownSection showDivider>
                                            <DropdownItem
                                                onClick={() =>
                                                    mcqAnswers
                                                        ? navigate(
                                                              `${location.pathname}/update/mcq`
                                                          )
                                                        : navigate(
                                                              `${location.pathname}/update/normal`
                                                          )
                                                }
                                                endContent={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-4">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                        />
                                                    </svg>
                                                }
                                                className="text-black"
                                                key="edit">
                                                Edit
                                            </DropdownItem>
                                        </DropdownSection>
                                        <DropdownSection>
                                            <DropdownItem
                                                onClick={() =>
                                                    dispatch(
                                                        modelActions.show({
                                                            name: modelNames.DELETE_QUESTION,
                                                            props: { id: questionID }
                                                        })
                                                    )
                                                }
                                                endContent={
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-4">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                        />
                                                    </svg>
                                                }
                                                className="text-danger"
                                                key="delete">
                                                Delete
                                            </DropdownItem>
                                        </DropdownSection>
                                    </DropdownMenu>
                                </Dropdown>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Reader value={question} />
                        <ul className="space-y-2">
                            {mcqAnswers?.map(
                                (answer: { index: number; value: string }, i: number) => (
                                    <li
                                        key={i}
                                        className="p-2 pl-5 rounded-lg border-medium border-spacing-5">
                                        {answer.value}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 border rounded-md border-light-gray">
                        <h3 className="p-4 text-lg font-semibold rounded-md bg-slate-100">
                            Comments
                        </h3>
                        {commentData?.data?.map(
                            (
                                commentData: {
                                    questionId: number;
                                    userId: number;
                                    comment: any;
                                    createdAt: string;
                                    firstName: string;
                                    lastName: string;
                                },
                                index: number
                            ) => {
                                console.log('Comment Data:', commentData.comment);
                                console.log(commentData.lastName + ' ' + commentData.firstName);

                                const formattedDate = new Date(
                                    commentData.createdAt
                                ).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                });

                                return (
                                    <div key={index} className="rounded-md bg-slate-100">
                                        <div className="flex justify-between gap-2 p-4 pt-4">
                                            <span className="text-xs truncate">
                                                {commentData.firstName + ' ' + commentData.lastName}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <Reader value={commentData.comment} className="p-4" />
                                    </div>
                                );
                            }
                        )}

                        {onReplyAll && (
                            <ForumQuestionReplyForm
                                onCancel={() => setOnReplyAll(null)}
                                questionId={questionID}
                            />
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={() => setOnReplyAll(1)}>Comment</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
