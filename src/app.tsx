import config from './config';
import DefaultRoutes from './routes';
import StudentRoutes from './routes/student';
import TeacherRoutes from './routes/teacher';

function App() {
    const role = config.role;

    switch (role) {
        case 'STUDENT':
            return <StudentRoutes />;
        case 'TEACHER':
            return <TeacherRoutes />;

        default:
            return <DefaultRoutes />;
    }
}

export default App;