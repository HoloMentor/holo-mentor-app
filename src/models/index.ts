import ProfileUser from './containers/profile/user';
import ProfileInformation from './containers/profile/information';
import ProfileUserInfo from './containers/profile/user-info';
import ProfilePersonalInfo from './containers/profile/personal-info';
import AddStaff from './containers/profile/add-academic-staff';
import RemoveStaff from './containers/profile/remove-academic-staff';
import AddMCQ from './containers/add-mcq';
import AddStudyPlan from './containers/add-study-plan';
import AddInstitute from './containers/institutes/add';

export const modelContainers: ModelContainers = {
    PROFILE_USER: {
        model: ProfileUser
    },
    PROFILE_INFORMATION: {
        model: ProfileInformation
    },
    PROFILE_USER_INFO: {
        model: ProfileUserInfo
    },
    PROFILE_PERSONAL_INFO: {
        model: ProfilePersonalInfo
    },
    ADD_ACADEMIC_STAFF: {
        model: AddStaff
    },
    ADD_INSTITUTE: {
        model: AddInstitute,
        props: { size: '2xl' }
    },
    REMOVE_ACADEMIC_STAFF: {
        model: RemoveStaff
    },
    ADD_MCQ: {
        model: AddMCQ
    },
    ADD_STUDY_PLAN: {
        model: AddStudyPlan
    }
};

export const modelNames = {
    PROFILE_USER: 'PROFILE_USER',
    PROFILE_INFORMATION: 'PROFILE_INFORMATION',
    PROFILE_USER_INFO: 'PROFILE_USER_INFO',
    PROFILE_PERSONAL_INFO: 'PROFILE_PERSONAL_INFO',
    ADD_ACADEMIC_STAFF: 'ADD_ACADEMIC_STAFF',
    ADD_INSTITUTE: 'ADD_INSTITUTE',
    REMOVE_ACADEMIC_STAFF: 'REMOVE_ACADEMIC_STAFF',
    ADD_MCQ: 'ADD_MCQ',
    ADD_STUDY_PLAN: 'ADD_STUDY_PLAN'
};
