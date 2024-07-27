const superAdminSideBar: RoleSideBarProps = {
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
            name: 'Logout',
            bottom: true,
            onClick: () => {},
            icon: () => (
                <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.1971 3.49182C16.499 3.49182 20.7971 7.78989 20.7971 13.0918C20.7971 18.3938 16.499 22.6918 11.1971 22.6918M8.79703 16.9318L4.95703 13.0918M4.95703 13.0918L8.79703 9.25182M4.95703 13.0918H16.957"
                        stroke="#2B2E48"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        }
    ]
};

export default superAdminSideBar;
