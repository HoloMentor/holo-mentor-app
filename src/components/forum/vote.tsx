interface Props {
    id: string | number;
    voteCount?:number
}

export default function ForumQuestionVote({ id, voteCount = 0 }: Props) {
    return (
        <div className="flex items-center gap-2 min-h-36">
            <span className="font-semibold text-dark-gray">{voteCount}</span>
            <div className="flex flex-col gap-4">
                <button className="p-1 transition-all duration-300 rounded-full hover:bg-slate-100 active:bg-slate-200">
                    <svg
                        width="29"
                        height="30"
                        viewBox="0 0 29 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Light/Arrow - Left 2">
                            <g id="Arrow - Left 2">
                                <path
                                    id="Stroke 1"
                                    d="M6.04427 19.1178L14.5026 10.6595L22.9609 19.1178"
                                    stroke="#6A6A6A"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
                <button className="p-1 transition-all duration-300 rounded-full hover:bg-slate-100 active:bg-slate-200">
                    <svg
                        width="29"
                        height="30"
                        viewBox="0 0 29 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="Iconly/Light/Arrow - Left 3">
                            <g id="Arrow - Left 2">
                                <path
                                    id="Stroke 1"
                                    d="M22.9557 10.6595L14.4974 19.1179L6.03906 10.6595"
                                    stroke="#6A6A6A"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
}
