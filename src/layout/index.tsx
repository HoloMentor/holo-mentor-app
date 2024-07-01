import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import SideBar from './sidebar';
import links from './nav-links';

export default function Layout() {
    return (
        <div className="flex gap-6 min-h-screen bg-light-gray max-md:gap-3">
            <SideBar links={links.student} />

            <div className="flex flex-col gap-6 w-full">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
