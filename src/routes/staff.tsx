import Layout from '@/layout';
import loadable from '@loadable/component';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/pages/teacher/home'));
const Classes = loadable(() => import('@/pages/teacher/classes/index'));
const Profile = loadable(() => import('@/pages/teacher/profile'));
const Notifications = loadable(() => import('@/pages/teacher/notifications'));
const StudyPlan = loadable(() => import('@/pages/teacher/study-plan'));
const CreatePlan = loadable(() => import('@/pages/teacher/study-plan-create'));
const StudyPlanView = loadable(() => import('@/pages/teacher/study-plan-individual'));
const ClassMaterials = loadable(() => import('@/pages/teacher/classes/materials'));
const StudentList = loadable(() => import('@/pages/teacher/quizes'));
const Submissions = loadable(() => import('@/pages/teacher/submissions'));
const StudentProfile = loadable(() => import('@/pages/teacher/student-profile-details'));
const SubjectForums = loadable(() => import('@/pages/teacher/classes/forum/'));
const SubjectForumMCQ = loadable(() => import('@/pages/teacher/classes/forum/mcq'));
const SubjectForumEssay = loadable(() => import('@/pages/teacher/classes/forum/essay'));
const SubjectForum = loadable(() => import('@/pages/student/subjects/forum/question'));
const Quizes = loadable(() => import('@/pages/staff/classes/quiz'));
const QuizInfo = loadable(() => import('@/pages/staff/classes/quiz/questions'));

export default function TeacherRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="classes" element={<Outlet />}>
                    <Route path="" element={<Classes />}></Route>
                    <Route path=":classId" element={<Outlet />}></Route>
                    //add routes inside classId
                </Route>
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

                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />

                <Route path=":institute/:year/*" element={<ClassMaterials />}></Route>
            </Route>
        </Routes>
    );
}
