import Layout from '@/layout';
import loadable from '@loadable/component';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = loadable(() => import('@/pages/teacher/home'));
const Classes = loadable(() => import('@/pages/teacher/classes/index'));
const Profile = loadable(() => import('@/pages/teacher/profile'));
const Notifications = loadable(() => import('@/pages/teacher/notifications'));
const StudyPlan = loadable(() => import('@/pages/teacher/study-plan/index'));
const CreatePlan = loadable(() => import('@/pages/teacher/study-plan/create'));
const StudyPlanView = loadable(() => import('@/pages/teacher/study-plan/view'));
const ClassMaterials = loadable(() => import('@/pages/teacher/classes/materials'));
const StudentList = loadable(() => import('@/pages/teacher/student-list'));
const Submissions = loadable(() => import('@/pages/teacher/submissions'));
const StudentProfile = loadable(() => import('@/pages/teacher/student-profile-details'));
const SubjectForums = loadable(() => import('@/pages/teacher/classes/forum/index'));
const SubjectForumMCQ = loadable(() => import('@/models/containers/forum/add-mcq'));
const UpdateForumMCQ = loadable(() => import('@/models/containers/forum/update-mcq'));
const SubjectForumEssay = loadable(() => import('@/models/containers/forum/add-question'));
const UpdateForumEssay = loadable(() => import('@/models/containers/forum/update-question'));
const SubjectForum = loadable(() => import('@/pages/teacher/classes/forum/question'));
const Quizes = loadable(() => import('@/pages/teacher/classes/quiz'));
const QuizInfo = loadable(() => import('@/pages/teacher/classes/quiz/questions'));
const AddQuizQuestion = loadable(() => import('@/pages/teacher/classes/quiz/add-question'));
const QuizBankView = loadable(() => import('@/pages/teacher/classes/quiz/quiz-bank-view'));

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
                        <Route path="forum/:forumId/update/mcq" element={<UpdateForumMCQ/>} />
                        <Route path="forum/essay" element={<SubjectForumEssay />} />
                        <Route path="forum/:forumId/update/normal" element={<UpdateForumEssay />} />
                        <Route path="forum/essay" element={<SubjectForumEssay />} />
                        <Route path="forum/:forumId" element={<SubjectForum />} />
                        {/* <Route path="quiz/" element={<Quizes />} /> */}
                        <Route path="quiz" element={<QuizBankView />} />
                        <Route path="quiz/:quizId" element={<QuizInfo />} />
                        <Route path="quiz/add" element={<AddQuizQuestion />} />
                        <Route path="studyplan" element={<Outlet />}>
                            <Route path="" element={<StudyPlan />}></Route>
                            <Route path="create/:tierNo" element={<CreatePlan />}></Route>
                            {/* <Route path="view/:studyPlanId" element={<StudyPlanView />}></Route> */}
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
