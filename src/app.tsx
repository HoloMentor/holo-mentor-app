import config from '@/config';
import DefaultRoutes from '@/routes';
import StudentRoutes from '@/routes/student';
import TeacherRoutes from '@/routes/teacher';
import InstituteRoutes from '@/routes/institute';
import SuperAdminRoutes from '@/routes/super-admin';
import { useDispatch, useSelector } from 'react-redux';
import { IAppDispatch, IRootState } from '@/redux';
import { useEffect } from 'react';
import { authorizeUser } from '@/redux/reducers/user.reducer';

function App() {
    const dispatch = useDispatch<IAppDispatch>();
    const { user } = useSelector((state: IRootState) => state.user);
    const role =
        config.role || user.userRole === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : user.instituteRole;

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

        default:
            return <DefaultRoutes />;
    }
}

export default App;
