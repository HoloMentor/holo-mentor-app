import { IAppDispatch } from '@/redux';
import { authorizeUser } from '@/redux/reducers/user.reducer';
import DefaultRoutes from '@/routes';
import InstituteRoutes from '@/routes/institute';
import StudentRoutes from '@/routes/student';
import SuperAdminRoutes from '@/routes/super-admin';
import TeacherRoutes from '@/routes/teacher';
import StaffRoutes from '@/routes/staff';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useRoleHandler from './hooks/role-handler';

function App() {
    const dispatch = useDispatch<IAppDispatch>();
    const role = useRoleHandler();

    useEffect(() => {
        dispatch(authorizeUser());
    }, []);

    switch (role) {
        case 'STUDENT':
            return <StudentRoutes />;
        case 'TEACHER':
            return <TeacherRoutes />;
        case 'INSTITUTE':
            return <InstituteRoutes />;
        case 'SUPER_ADMIN':
            return <SuperAdminRoutes />;
        case 'STAFF':
            return <StaffRoutes />;
        default:
            return <DefaultRoutes />;
    }
}

export default App;
