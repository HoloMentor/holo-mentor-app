import { Avatar } from '@nextui-org/react';

interface Props {
    reply?: boolean;
}

export default function ForumQuestionReply({ reply = false }: Props) {
    return (
        <div className={`flex gap-4 p-3 ${reply ? 'pl-20' : ''}`}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

            <div className="flex flex-col gap-5 bg-second-white w-full rounded-lg p-4">
                <div className="flex gap-2 justify-between">
                    <h3 className="font-semibold">Ralph Edwards</h3>
                    <span className="text-dark-gray text-sm">Aug 19, 2021</span>
                </div>

                <p className="pr-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate aut
                    molestiae ipsam alias quisquam eaque ipsa dolore, perferendis esse blanditiis
                    totam, sed atque accusamus recusandae fugiat consequatur! Corrupti, impedit
                    voluptatem?
                </p>

                <div className="flex items-center justify-end gap-3 text-dark-gray">
                    <span className="flex gap-1 items-center cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                        </svg>

                        <span className="text-medium">4</span>
                    </span>
                    {!reply && (
                        <span className="flex gap-1 items-center cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                />
                            </svg>

                            <span className="text-medium">3</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
