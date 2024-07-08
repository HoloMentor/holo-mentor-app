import { Link } from 'react-router-dom';
import NavLink from './navlink';

export default function SideBar({ links, pathname }: SideBarProps) {
    return (
        <div className="flex flex-col bg-white w-full max-w-64 min-h-screen max-md:max-w-14 ">
            <Link to="/">
                <img
                    src="/images/logo.svg"
                    alt="Holo Mentor"
                    className="w-full p-6 max-md:hidden"
                />
            </Link>

            <div className="hidden mt-4 w-full justify-center max-md:flex p-3">
                <Link to="/">
                    <img
                        src="/images/logo-icon.svg"
                        alt="Holo Mentor"
                        className="w-full max-w-16"
                    />
                </Link>
            </div>

            <div className="flex flex-col mt-9">
                {links.map(({ name, icon: Icon, to, ...props }: NavOptionProps, index: number) => {
                    return (
                        <NavLink key={index} to={to} pathname={pathname} {...props}>
                            <Icon />

                            <span className="max-md:hidden">{name}</span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
}
