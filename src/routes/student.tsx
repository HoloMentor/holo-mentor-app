import Layout from '@/layout';
import loadable from '@loadable/component';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/pages/student/home'));
const Profile = loadable(() => import('@/pages/student/profile'));
const Notifications = loadable(() => import('@/pages/student/notifications'));

const Subjects = loadable(() => import('@/pages/student/subjects'));
const Subject = loadable(() => import('@/pages/student/subjects/subject'));
const SubjectMentor = loadable(() => import('@/pages/student/subjects/mentor'));
const SubjectQuiz = loadable(() => import('@/pages/student/subjects/quiz'));
const QuizInfo = loadable(() => import('@/pages/student/subjects/quiz/results'));
const QuizQuestion = loadable(() => import('@/pages/student/subjects/quiz/question'));
const SubjectForums = loadable(() => import('@/pages/student/subjects/forum'));
const SubjectForum = loadable(() => import('@/pages/student/subjects/forum/question'));
const SubjectForumMCQ = loadable(() => import('@/pages/student/subjects/forum/mcq'));
const SubjectForumEssay = loadable(() => import('@/pages/student/subjects/forum/essay'));
const StudyPlanView = loadable(() => import('@/pages/student/study-plan/view'));

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
                        <Route path="mentor/view/:studyPlanId" element={<StudyPlanView />}></Route>
                        <Route path="forum" element={<SubjectForums />} />
                        <Route path="forum/mcq" element={<SubjectForumMCQ />} />
                        <Route path="forum/essay" element={<SubjectForumEssay />} />
                        <Route path="forum/:forumId" element={<SubjectForum />} />
                        <Route path="quiz" element={<SubjectQuiz />} />
                        <Route path="quiz/:quizId" element={<QuizInfo />} />
                        <Route path="quiz/attempt/:quizId" element={<QuizQuestion />} />
                    </Route>
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
        </Routes>
    );
}
