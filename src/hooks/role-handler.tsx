import config from '@/config';
import { IRootState } from '@/redux';
import { useSelector } from 'react-redux';

const useRoleHandler = () => {
    const { user } = useSelector((state: IRootState) => state.user);

    if (config.role) return config.role;

    if (!user?.userId) return null;

    if (user.userRole === 'SUPER_ADMIN') return 'SUPER_ADMIN';

    return user.instituteRole;
};

export default useRoleHandler;
