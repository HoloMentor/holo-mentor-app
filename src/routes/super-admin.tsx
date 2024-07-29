import Layout from '@/layout';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
const Home = loadable(() => import('@/pages/super-admin/home'));
const Profile = loadable(() => import('@/pages/super-admin/profile'));
const Notifications = loadable(() => import('@/pages/super-admin/notifications'));
const Institutes = loadable(() => import('@/pages/super-admin/institutes/index'));

export default function SuperAdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="institutes" element={<Institutes />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
        </Routes>
    );
}
