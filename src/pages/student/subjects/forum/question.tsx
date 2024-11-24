import Button from '@/components/button';
import ForumQuestionReply from '@/components/forum/reply';
import ForumQuestionReplyForm from '@/components/forum/reply-form';
import ForumQuestionVote from '@/components/forum/vote';
import Heading from '@/components/headings/main';
import {
    Button as NextUIButton,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    User
} from '@nextui-org/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ForumPage() {
    const [onReplyAll, setOnReplyAll] = useState(null);
    const [onReplyQuestion, setOnReplyQuestion] = useState(null);
    const params = useParams();

    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>
            <div className="flex gap-5 bg-white rounded-md p-6">
                <div>
                    <ForumQuestionVote id={params.forumId} />
                </div>

                <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between w-full">
                        <User
                            name="Jane Doe"
                            description="Aug 19, 2024"
                            avatarProps={{
                                src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                            }}
                        />

                        <Dropdown>
                            <DropdownTrigger>
                                <NextUIButton isIconOnly className="rounded-full !size-7 !min-w-7">
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
                                    <DropdownItem
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
                                                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                                />
                                            </svg>
                                        }
                                        className="text-black"
                                        key="share">
                                        Share
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection>
                                    <DropdownItem
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
                    </div>

                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-medium">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </h1>

                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
                            laboriosam vero error necessitatibus, ea fuga ducimus impedit. Nobis
                            recusandae esse repudiandae ex ipsa perspiciatis nisi. Perspiciatis quas
                            quam quisquam saepe!
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 border border-light-gray rounded-md">
                        <ForumQuestionReply
                            onReply={(id: number | string) => setOnReplyQuestion(id)}
                        />
                        <ForumQuestionReply reply />
                        {onReplyQuestion && (
                            <ForumQuestionReplyForm
                                reply
                                onCancel={() => setOnReplyQuestion(null)}
                            />
                        )}

                        {onReplyAll && (
                            <ForumQuestionReplyForm onCancel={() => setOnReplyAll(null)} />
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={() => setOnReplyAll(1)}>Leave an Answer</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
