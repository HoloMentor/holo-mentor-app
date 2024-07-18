import Layout from '@/layout';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/pages/institute/home'));
const Teachers = loadable(() => import('@/pages/institute/teachers'));
const Profile = loadable(() => import('@/pages/institute/profile'));
const Notification = loadable(()  => import('@/pages/institute/notifications'));

export default function InstituteRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="teachers" element={<Teachers/>} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notification />} />
            </Route>
        </Routes>
    );
}
