import { Outlet, useLocation, useParams } from 'react-router-dom';
import Navbar from './navbar';
import SideBar from './sidebar';
import links from './links';
import React from 'react';
import config from '@/config';

export default function Layout() {
    const role = config.role;
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
                            _.to = _.to.replace(`:${param}`, params[param]);
                        }

                        return _;
                    });
                }
            }
        }
        return roleLinks.general;
    }, [role, location.pathname]);
    return (
        <div className="flex gap-6 min-h-screen bg-light-gray max-md:gap-3">
            <SideBar links={routeLinks} pathname={location.pathname} />

            <div className="flex flex-col gap-6 w-full pb-5">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
