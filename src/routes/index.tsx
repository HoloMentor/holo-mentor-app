import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
const Login = loadable(() => import('@/pages/login'));
const Register = loadable(() => import('@/pages/register'));

export default function DefaultRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
        </Routes>
    );
}
