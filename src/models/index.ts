import ProfileUser from './containers/profile/user';
import ProfileInformation from './containers/profile/information';
import ProfileUserInfo from './containers/profile/user-info';
import ProfilePersonalInfo from './containers/profile/personal-info';
import AddStaff from './containers/profile/add-academic-staff';
import RemoveStaff from './containers/profile/remove-academic-staff';
import AddMCQ from './containers/add-mcq';
import AddStudyPlan from './containers/add-study-plan';
import AddInstitute from './containers/institutes/add';
import AddClass from './containers/classes/add';
import AddStudent from './containers/students/add-student';
import AddStudents from './containers/students/add-students';
import DeleteInstitute from './containers/institutes/delete';
import EditInstitute from './containers/institutes/edit';

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
        model: ProfilePersonalInfo,
        props: { size: 'xl' }
    },
    ADD_ACADEMIC_STAFF: {
        model: AddStaff
    },
    ADD_INSTITUTE: {
        model: AddInstitute,
        props: { size: '2xl' }
    },
    EDIT_INSTITUTE: {
        model: EditInstitute,
        props: { size: '2xl' }
    },
    REMOVE_ACADEMIC_STAFF: {
        model: RemoveStaff
    },
    ADD_MCQ: {
        model: AddMCQ,
        props: { size: '3xl' }
    },
    ADD_STUDY_PLAN: {
        model: AddStudyPlan
    },
    ADD_CLASS: {
        model: AddClass,
        props: { size: 'xl' }
    },
    ADD_STUDENT: {
        model: AddStudent,
        props: { size: 'xl' }
    },
    ADD_STUDENTS: {
        model: AddStudents,
        props: { size: 'xl' }
    },
    DELETE_INSTITUTE: {
        model: DeleteInstitute
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
    ADD_STUDY_PLAN: 'ADD_STUDY_PLAN',
    ADD_CLASS: 'ADD_CLASS',
    ADD_STUDENT: 'ADD_STUDENT',
    ADD_STUDENTS: 'ADD_STUDENTS',
    DELETE_INSTITUTE: 'DELETE_INSTITUTE',
    EDIT_INSTITUTE: 'EDIT_INSTITUTE'
};
