import Layout from '@/layout';
import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';
const Home = loadable(() => import('@/pages/super-admin/home'));

export default function SuperAdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
            </Route>
        </Routes>
    );
}
