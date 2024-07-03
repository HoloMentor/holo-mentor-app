import Layout from '@/layout';
import loadable from '@loadable/component';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/pages/teacher/home'));
const Classes = loadable(() => import('@/pages/teacher/classes'))
const Profile = loadable(() => import('@/pages/teacher/profile'));
const Notifications = loadable(() => import('@/pages/teacher/notifications'));
const StudyPlan = loadable(() => import('@/pages/teacher/study-plan'))

export default function StudentRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="classes" element={<Classes />}>
                
                    <Route path=":classId" element={<Outlet />}></Route>
                    //add routes inside classId
                </Route>
                <Route path='studyplan' element={<StudyPlan/>}></Route>
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
        </Routes>
    );
}
