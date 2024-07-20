import config from './config';
import DefaultRoutes from './routes';
import StudentRoutes from './routes/student';
import TeacherRoutes from './routes/teacher';
import InstituteRoutes from './routes/institute';

function App() {
    const role = config.role;

    switch (role) {
        case 'STUDENT':
            return <StudentRoutes />;
        case 'TEACHER':
            return <TeacherRoutes />;
        case 'INSTITUTE':
            return <InstituteRoutes />;

        default:
            return <DefaultRoutes />;
    }
}

export default App;
