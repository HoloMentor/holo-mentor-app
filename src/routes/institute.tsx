import Layout from '@/layout';
import loadable from '@loadable/component';
import { Route, Routes, Outlet } from 'react-router-dom';

const Home = loadable(() => import('@/pages/institute/home'));
const Profile = loadable(() => import('@/pages/institute/profile'));
const Notification = loadable(() => import('@/pages/institute/notifications'));
const Teachers = loadable(() => import('@/pages/institute/teachers/index.tsx'));
const TeacherProfile = loadable(() => import('@/pages/institute/teachers/profile'));
const ClassProgress = loadable(() => import('@/pages/institute/classes/class'));
const Students = loadable(() => import('@/pages/institute/classes/class/students'));
const Class = loadable(() => import('@/pages/institute/classes'));
const Subjects = loadable(() => import('@/pages/institute/subjects/index.tsx'));

export default function InstituteRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="teachers" element={<Outlet />}>
                    <Route path="" element={<Teachers />} />
                    <Route path=":teacherId" element={<TeacherProfile />} />
                </Route>
                <Route path="classes" element={<Outlet />}>
                    <Route path="" element={<Class />} />
                    <Route path=":classId" element={<ClassProgress />} />
                    <Route path=":classId/students" element={<Students />} />
                </Route>
                <Route path="subjects" element={<Subjects />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notification />} />
            </Route>
        </Routes>
    );
}
