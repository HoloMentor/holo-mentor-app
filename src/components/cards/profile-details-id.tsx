interface ProfileInfoDetailsProps {
    user: {
        email: string;
        country: string;
        contactNumber: string;
        countryCode: string;
    };
}

export default function ProfileDetailsCardId({ user }: ProfileInfoDetailsProps) {
    return (
        <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">
            <h1 className="text-xl font-semibold text-dark-green">Personal Information</h1>

            <ul className="mt-4">
                <li className="flex gap-4 mb-4 text-sm items-center">
                    <div className="flex items-center justify-center w-5 h-5 text-neutral-500">
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
                                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                            />
                        </svg>
                    </div>
                    <span>
                        <a href="mailto:saliya@gmail.com" className="text-black">
                            {user.email || '-'}
                        </a>
                    </span>
                </li>
                <li className="flex gap-4 mb-4 text-sm items-center">
                    <div className="flex items-center justify-center w-5 h-5 text-neutral-500">
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
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                            />
                        </svg>
                    </div>
                    <span>
                        <a
                            href={`tel:${
                                user.contactNumber ? user.countryCode + user.contactNumber : '#'
                            }`}
                            className="text-black">
                            {user.contactNumber || '-'}
                        </a>
                    </span>
                </li>
                <li className="flex gap-4 mb-4 text-sm items-center">
                    <div className="flex items-center justify-center w-5 h-5 text-neutral-500">
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
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                        </svg>
                    </div>

                    <span>{user.country || '-'}</span>
                </li>
            </ul>
        </div>
    );
}
