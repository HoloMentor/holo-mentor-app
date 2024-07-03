import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
import StudentRoutes from './routes/student';
// import TeacherRoutes from './routes/teacher';

const Login = loadable(() => import('@/pages/login'));
const Register = loadable(() => import('@/pages/register'));

function App() {
    let logged = true;

    return (
        <div className="w-full min-h-screen overflow-x-hidden">
            {logged ? (
                role === 'teacher' ? (
                    <TeacherRoutes />
                ) : (
                    <StudentRoutes/>
                )
            ) : (
                // <TeacherRoutes />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
