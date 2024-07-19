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
                        stroke-width="1.5" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    <path 
                        d="M7.5 15C8.88071 15 10 13.8807 10 12.5C10 11.1193 8.88071 10 7.5 10C6.11929 10 5 11.1193 5 12.5C5 13.8807 6.11929 15 7.5 15Z" 
                        stroke="black" 
                        stroke-width="1.5" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    <path d="M12 7H18M18 11H15" 
                        stroke="black" 
                        stroke-width="1.5" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
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
            to: '/notifications',
            name: 'Notifications',
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
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                </svg>
            )
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
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    className="size-6">
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" 
                    />
                </svg>

            )
        },
        {
            to: '/',
            end: true,
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
        }
    ]
};

export default instituteSideBar;
