import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import loadable from '@loadable/component';

const Login = loadable(() => import('./pages/login'));
const Home = loadable(() => import('./pages/home'));
const Subjects = loadable(() => import('./pages/subjects'));
const Profile = loadable(() => import('./pages/profile'));
const Notifications = loadable(() => import('./pages/notifications'));

function App() {
    let logged = true;

    return (
        <div className="w-full min-h-screen overflow-x-hidden">
            <Routes>
                {logged ? (
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<Home />} />
                        <Route path="subjects" element={<Subjects />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="notifications" element={<Notifications />} />
                        <Route path="home" element={<Home />} />
                    </Route>
                ) : (
                    <Route path="/" element={<Login />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
