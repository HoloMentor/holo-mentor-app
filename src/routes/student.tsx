import Layout from '@/layout';
import loadable from '@loadable/component';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/components/home'));
const Profile = loadable(() => import('@/pages/student/profile'));
const Notifications = loadable(() => import('@/pages/student/notifications'));

const Subjects = loadable(() => import('@/pages/student/subjects'));
const Subject = loadable(() => import('@/pages/student/subjects/subject'));
const SubjectMentor = loadable(() => import('@/pages/student/subjects/mentor'));
const SubjectForum = loadable(() => import('@/pages/student/subjects/forum'));
const SubjectQuiz = loadable(() => import('@/pages/student/subjects/quiz'));

export default function StudentRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="subjects" element={<Outlet />}>
                    <Route path="" element={<Subjects />} />
                    <Route path=":subjectId" element={<Outlet />}>
                        <Route path="" element={<Subject />} />
                        <Route path="mentor" element={<SubjectMentor />} />
                        <Route path="forum" element={<SubjectForum />} />
                        <Route path="Quiz" element={<SubjectQuiz />} />
                    </Route>
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
        </Routes>
    );
}
