import ProfileUser from './containers/profile/user';
import ProfileInformation from './containers/profile/information';

export const modelContainers: ModelContainers = {
    PROFILE_USER: {
        model: ProfileUser
    },
    PROFILE_INFORMATION: {
        model: ProfileInformation
    }
};

export const modelNames = {
    PROFILE_USER: 'PROFILE_USER',
    PROFILE_INFORMATION: 'PROFILE_INFORMATION'
};
