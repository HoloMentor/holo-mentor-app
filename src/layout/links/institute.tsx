import LogoutComponent from '../components/logout';

const instituteSideBar: RoleSideBarProps = {
    general: [
        {
            to: '/',
            name: 'Home',
            icon: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                </svg>
            )
        },
        {
            to: '/teachers',
            name: 'Teachers',
            icon: () => (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 15C10.708 21 4.292 15 2 21M15.5 15H17.001C19.358 15 20.537 15 21.269 14.268C22.001 13.536 22.001 12.357 22.001 10V8C22.001 5.643 22.001 4.464 21.269 3.732C20.537 3 19.36 3 17.001 3H13.001C10.644 3 9.466 3 8.734 3.732C8.114 4.352 8.018 5.293 8.004 7"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7.5 15C8.88071 15 10 13.8807 10 12.5C10 11.1193 8.88071 10 7.5 10C6.11929 10 5 11.1193 5 12.5C5 13.8807 6.11929 15 7.5 15Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 7H18M18 11H15"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        {
            to: '/subjects',
            name: 'Subjects',
            icon: () => (
                <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.7 3.3684C2.8225 3.4548 2.2321 3.6501 1.7911 4.0911C1 4.8813 1 6.1548 1 8.7V12.3C1 14.8452 1 16.1187 1.7911 16.9089C2.2321 17.3499 2.8225 17.5452 3.7 17.6316M16.3 3.3684C17.1775 3.4548 17.7679 3.6501 18.2089 4.0911C19 4.8813 19 6.1548 19 8.7V12.3C19 14.8452 19 16.1187 18.2089 16.9089C17.7679 17.3499 17.1775 17.5452 16.3 17.6316M3.7 6.9C3.7 4.3548 3.7 3.0813 4.4911 2.2911C5.2813 1.5 6.5548 1.5 9.1 1.5H10.9C13.4452 1.5 14.7187 1.5 15.5089 2.2911C16.3 3.0813 16.3 4.3548 16.3 6.9V14.1C16.3 16.6452 16.3 17.9187 15.5089 18.7089C14.7187 19.5 13.4452 19.5 10.9 19.5H9.1C6.5548 19.5 5.2813 19.5 4.4911 18.7089C3.7 17.9187 3.7 16.6452 3.7 14.1V6.9Z"
                        stroke="black"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M7.2998 11.4H12.6998M7.2998 7.80005H12.6998M7.2998 15H9.9998"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            )
        },
        {
            to: '/classes',
            name: 'Classes',
            icon: () => (
                <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_692_20438)">
                        <path
                            d="M17.75 0.5H5C4.20435 0.5 3.44129 0.81607 2.87868 1.37868C2.31607 1.94129 2 2.70435 2 3.5V19.25C2 19.4489 2.07902 19.6397 2.21967 19.7803C2.36032 19.921 2.55109 20 2.75 20H16.25C16.4489 20 16.6397 19.921 16.7803 19.7803C16.921 19.6397 17 19.4489 17 19.25C17 19.0511 16.921 18.8603 16.7803 18.7197C16.6397 18.579 16.4489 18.5 16.25 18.5H3.5C3.5 18.1022 3.65804 17.7206 3.93934 17.4393C4.22064 17.158 4.60218 17 5 17H17.75C17.9489 17 18.1397 16.921 18.2803 16.7803C18.421 16.6397 18.5 16.4489 18.5 16.25V1.25C18.5 1.05109 18.421 0.860322 18.2803 0.71967C18.1397 0.579018 17.9489 0.5 17.75 0.5ZM17 15.5H5C4.47325 15.4992 3.95569 15.638 3.5 15.9022V3.5C3.5 3.10218 3.65804 2.72064 3.93934 2.43934C4.22064 2.15804 4.60218 2 5 2H17V15.5Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_692_20438">
                            <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0 0.5)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            )
        },
        {
            to: '/profile',
            name: 'Profile',
            icon: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            )
        },
        {
            name: 'Logout',
            bottom: true,
            render: LogoutComponent
        }
    ],
    class: [
        {
            to: '/class/:classId/progress',
            end: true,
            name: 'Class',
            icon: () => (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.5 2.25H6.75C5.95435 2.25 5.19129 2.56607 4.62868 3.12868C4.06607 3.69129 3.75 4.45435 3.75 5.25V21C3.75 21.1989 3.82902 21.3897 3.96967 21.5303C4.11032 21.671 4.30109 21.75 4.5 21.75H18C18.1989 21.75 18.3897 21.671 18.5303 21.5303C18.671 21.3897 18.75 21.1989 18.75 21C18.75 20.8011 18.671 20.6103 18.5303 20.4697C18.3897 20.329 18.1989 20.25 18 20.25H5.25C5.25 19.8522 5.40804 19.4706 5.68934 19.1893C5.97064 18.908 6.35218 18.75 6.75 18.75H19.5C19.6989 18.75 19.8897 18.671 20.0303 18.5303C20.171 18.3897 20.25 18.1989 20.25 18V3C20.25 2.80109 20.171 2.61032 20.0303 2.46967C19.8897 2.32902 19.6989 2.25 19.5 2.25ZM18.75 17.25H6.75C6.22325 17.2492 5.70569 17.388 5.25 17.6522V5.25C5.25 4.85218 5.40804 4.47064 5.68934 4.18934C5.97064 3.90804 6.35218 3.75 6.75 3.75H18.75V17.25Z"
                        fill="black"
                    />
                </svg>
            )
        },
        {
            to: '/class/:classId/students',
            end: true,
            name: 'Students',
            icon: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            )
        },
        {
            to: '/',
            end: true,
            bottom: true,
            name: 'Home',
            icon: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                </svg>
            )
        },
        {
            name: 'Logout',
            bottom: true,
            render: LogoutComponent
        }
    ]
};

export default instituteSideBar;
