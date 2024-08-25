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
import AddTeacher from './containers/institutes/add-teacher';
import AddSubjects from './containers/institutes/add-subject';

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
    REMOVE_ACADEMIC_STAFF: {
        model: RemoveStaff
    },
    ADD_MCQ: {
        model: AddMCQ
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
    ADD_TEACHER:{
        model: AddTeacher,
        props: { size: 'xl' }
    },
    ADD_SUBJECTS:{
        model: AddSubjects,
        props: { size: 'xl' }
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
    ADD_TEACHER: 'ADD_TEACHER',
    ADD_SUBJECTS: 'ADD_SUBJECTS'
};
