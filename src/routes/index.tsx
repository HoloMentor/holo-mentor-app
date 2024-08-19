import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
const Login = loadable(() => import('@/pages/login/index'));
const Register = loadable(() => import('@/pages/register'));
const ForgotPassword = loadable(() => import('@/pages/forgot-password'));
const Invitation = loadable(() => import('@/pages/invitation'));

export default function DefaultRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    );
}
