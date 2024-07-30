import { ReactNode } from 'react';
import { NavLink as ReactNavLink, NavLinkProps, To } from 'react-router-dom';

interface Props extends Omit<NavLinkProps, 'children' | 'to'> {
    children: ReactNode;
    to?: To;
    pathname?: string;
    bottom?: boolean;
}

export default function NavLink({ children, pathname, bottom, ...props }: Props) {
    let className =
        'flex gap-3 !text-black font-medium transition-all duration-75 hover:!text-dark-green group';

    return props.to ? (
        <ReactNavLink
            className={({ isActive }) => {
                if (isActive) className += ' bg-[#00684A1C] is-active';

                return className;
            }}
            to={props.to}
            {...props}>
            <svg
                width="20"
                height="58"
                viewBox="0 0 20 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-0 transition-all duration-1000 group-[.is-active]:w-6 max-md:hidden">
                <mask
                    id="mask0_386_2545"
                    style={{ maskType: 'alpha' }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="-25"
                    width="20"
                    height="102">
                    <rect y="-24.8882" width="19.708" height="101" fill="#C4C4C4" />
                </mask>
                <g mask="url(#mask0_386_2545)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-0.00135422 -13.0828C-0.00135422 -15.2597 -1.76607 -17.0244 -3.94296 -17.0244C-6.11985 -17.0244 -7.88457 -15.2597 -7.88457 -13.0828V8.30112C-7.88457 14.2822 -11.8262 19.9994 -11.8262 25.9805C-11.8262 31.9616 -7.88457 37.6788 -7.88457 43.6599V68.7299C-7.88457 70.9067 -6.11985 72.6715 -3.94296 72.6715C-1.76607 72.6715 -0.00135422 70.9067 -0.00135422 68.7299V54.8552C-0.00135422 45.0155 11.8235 35.8202 11.8235 25.9805C11.8235 25.3 11.7577 24.6338 11.6319 23.9872C9.94631 15.3279 -0.00135422 7.77065 -0.00135422 -1.05114V-13.0828Z"
                        fill="#023430"
                    />
                </g>
            </svg>

            <div className="flex gap-3 transition-all duration-1000 py-4 pl-3 pr-4 group-[.is-active]:pl-0 max-md:pl-0 max-md:pr-0 max-md:justify-center w-full">
                {children}
            </div>
        </ReactNavLink>
    ) : (
        <button className={className}>
            <div className="flex gap-3 transition-all duration-1000 py-4 pl-6 pr-4 group-[.is-active]:pl-0 max-md:pl-0 max-md:pr-0 max-md:justify-center w-full">
                {children}
            </div>
        </button>
    );
}
