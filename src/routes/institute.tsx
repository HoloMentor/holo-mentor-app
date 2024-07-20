import Layout from '@/layout';
import loadable from '@loadable/component';
import { Route, Routes, Outlet } from 'react-router-dom';

const Home = loadable(() => import('@/pages/institute/home'));
const Teachers = loadable(() => import('@/pages/institute/teachers'));
const Profile = loadable(() => import('@/pages/institute/profile'));
const Notification = loadable(() => import('@/pages/institute/notifications'));
const TeacherProfile = loadable(() => import('@/pages/institute/teachers/profile'));
const Class = loadable(() => import('@/pages/institute/class/class-progress'));
const Students = loadable(() => import('@/pages/institute/class/class-students'));

export default function InstituteRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="teachers" element={<Outlet />}>
                    <Route path="" element={<Teachers />} />
                    <Route path=":teacherId" element={<TeacherProfile />} />
                </Route>
                <Route path="class" element={<Outlet />}>
                    <Route path=":classId/progress" element={<Class />} />
                    <Route path=":classId/students" element={<Students />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notification />} />
            </Route>
        </Routes>
    );
}
