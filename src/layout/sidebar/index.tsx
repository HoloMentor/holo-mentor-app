import NavLink from './navlink';

export interface NavOptionProps {
    icon: () => React.ReactNode;
    name: string;
    to: string;
}

interface SideBarProps {
    links: NavOptionProps[];
}

export default function SideBar({ links }: SideBarProps) {
    return (
        <div className="flex flex-col bg-white w-full max-w-64 min-h-screen max-md:max-w-14 ">
            <img src="/images/logo.svg" alt="Holo Mentor" className="w-full p-6 max-md:hidden" />
            <div className="hidden mt-4 w-full justify-center max-md:flex p-3">
                <img src="/images/logo-icon.svg" alt="Holo Mentor" className="w-full max-w-16" />
            </div>

            <div className="flex flex-col mt-9">
                {links.map((_: NavOptionProps, index: number) => {
                    return (
                        <NavLink key={index} to={_.to}>
                            <_.icon />

                            <span className="max-md:hidden">{_.name}</span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
}
