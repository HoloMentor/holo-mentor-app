import useRoleHandler from '@/hooks/role-handler';
import { IRootState } from '@/redux';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import links from './links';
import Navbar from './navbar';
import SideBar from './sidebar';

export default function Layout() {
    const role = useRoleHandler();
    const location = useLocation();

    const params = useParams();

    /* filter sidebar content according to role and path */
    const routeLinks = React.useMemo(() => {
        const roleLinks = (links as any)[role.toLowerCase()];
        const segment = location.pathname.slice(1).split('/')?.[0];

        if (segment) {
            const regex = new RegExp(`(?<=${segment}\/).*`);

            if (regex.test(location.pathname)) {
                if (segment in roleLinks) {
                    return roleLinks[segment].map((_: NavOptionProps) => {
                        for (const param in params) {
                            if ('to' in _) _.to = _.to.replace(`:${param}`, params[param]);
                        }

                        return _;
                    });
                }
            }
        }

        return roleLinks.general;
    }, [role, location.pathname]);
    return (
        <div className="flex min-h-screen gap-6 bg-light-gray max-md:gap-3">
            <SideBar links={routeLinks} pathname={location.pathname} />

            <div className="flex flex-col w-full gap-6 pb-5">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
