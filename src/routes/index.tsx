import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
const Login = loadable(() => import('@/pages/login/index'));
const Register = loadable(() => import('@/pages/register'));
const ForgotPassword = loadable(() => import('@/pages/forgot-password'));

export default function DefaultRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}
