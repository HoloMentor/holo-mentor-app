import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Layout from './layout';
import Home from './pages/home';
import Subjects from './pages/subjects';
import Profile from './pages/profile';
import Notifications from './pages/notifications';

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
