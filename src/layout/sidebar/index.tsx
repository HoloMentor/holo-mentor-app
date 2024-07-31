import { Link } from 'react-router-dom';
import NavLink from './navlink';

export default function SideBar({ links, pathname }: SideBarProps) {
    return (
        <div className="flex flex-col gap-5 bg-white w-full max-w-64 h-screen max-md:max-w-14 overflow-visible sticky top-0 left-0">
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

            <div className="flex flex-col mt-5">
                {links
                    .filter((_) => !_.bottom)
                    .map(
                        (
                            { name, render: Render, icon: Icon, ...props }: NavOptionProps,
                            index: number
                        ) => {
                            return Render ? (
                                <Render key={`top-${index}`} />
                            ) : (
                                <NavLink key={`top-${index}`} pathname={pathname} {...props}>
                                    <Icon />

                                    <span className="max-md:hidden">{name}</span>
                                </NavLink>
                            );
                        }
                    )}
            </div>

            <div className="flex flex-col justify-end h-full sticky bottom-0">
                {links
                    .filter((_) => _.bottom)
                    .map(
                        (
                            { name, render: Render, icon: Icon, ...props }: NavOptionProps,
                            index: number
                        ) => {
                            return Render ? (
                                <Render key={`bottom-${index}`} />
                            ) : (
                                <NavLink key={`bottom-${index}`} pathname={pathname} {...props}>
                                    <Icon />

                                    <span className="max-md:hidden">{name}</span>
                                </NavLink>
                            );
                        }
                    )}
            </div>
        </div>
    );
}
