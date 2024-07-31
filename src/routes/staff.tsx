import Layout from '@/layout';
import loadable from '@loadable/component';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/pages/staff/home'));
const Classes = loadable(() => import('@/pages/staff/classes/index'));
const Profile = loadable(() => import('@/pages/staff/profile'));
const Notifications = loadable(() => import('@/pages/staff/notifications'));
const StudyPlan = loadable(() => import('@/pages/staff/study-plan'));
const CreatePlan = loadable(() => import('@/pages/staff/study-plan-create'));
const StudyPlanView = loadable(() => import('@/pages/staff/study-plan-individual'));
const ClassMaterials = loadable(() => import('@/pages/staff/classes/materials'));
const StudentList = loadable(() => import('@/pages/staff/student-list'));
const Submissions = loadable(() => import('@/pages/staff/submissions'));
const StudentProfile = loadable(() => import('@/pages/staff/student-profile-details'));
const SubjectForums = loadable(() => import('@/pages/staff/classes/forum/'));
const SubjectForumMCQ = loadable(() => import('@/pages/staff/classes/forum/mcq'));
const SubjectForumEssay = loadable(() => import('@/pages/staff/classes/forum/essay'));
const SubjectForum = loadable(() => import('@/pages/staff/classes/forum/question'));
const Quizes = loadable(() => import('@/pages/staff/classes/quiz'));
const QuizInfo = loadable(() => import('@/pages/staff/classes/quiz/questions'));

export default function TeacherRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="classes" element={<Outlet />}>
                    <Route path="" element={<Classes />}></Route>
                    <Route path=":classId" element={<Outlet />}>
                        <Route path="" element={<ClassMaterials />} />
                        <Route path="forum" element={<SubjectForums />} />
                        <Route path="forum/mcq" element={<SubjectForumMCQ />} />
                        <Route path="forum/essay" element={<SubjectForumEssay />} />
                        <Route path="forum/:forumId" element={<SubjectForum />} />
                        <Route path="quiz/" element={<Quizes />} />
                        <Route path="quiz/:quizId" element={<QuizInfo />} />
                        <Route path="studyplan" element={<Outlet />}>
                            <Route path="" element={<StudyPlan />}></Route>
                            <Route path="create" element={<CreatePlan />}></Route>
                            <Route path="view" element={<StudyPlanView />}></Route>
                        </Route>
                        <Route path="student" element={<Outlet />}>
                            <Route path="" element={<StudentList />}></Route>
                            <Route path="details"></Route>
                            <Route path="submissions" element={<Submissions />}></Route>
                            <Route path="profile" element={<StudentProfile />}></Route>
                        </Route>
                    </Route>
                </Route>

                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
        </Routes>
    );
}
