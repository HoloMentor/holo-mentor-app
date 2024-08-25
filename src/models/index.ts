import ProfileUser from './containers/profile/user';
import ProfileInformation from './containers/profile/information';
import ProfileUserInfo from './containers/profile/user-info';
import ProfilePersonalInfo from './containers/profile/personal-info';
import AddStaff from './containers/profile/add-academic-staff';
import RemoveStaff from './containers/profile/remove-academic-staff';
import AddMCQ from './containers/add-mcq';
import AddMarks from './containers/upload-marks';
import AddInstitute from './containers/institutes/add';
import AddClass from './containers/classes/add';
import AddStudent from './containers/students/add-student';
import AddStudents from './containers/students/add-students';
import AddTeacher from './containers/institutes/add-teacher';
import AddSubject from './containers/subject/add.tsx';
import EditSubject from './containers/subject/edit.tsx';
import DeleteSubject from './containers/subject/delete.tsx';
import DeleteInstitute from './containers/institutes/delete';
import EditInstitute from './containers/institutes/edit';
import EditMCQ from './containers/edit-mcq';
import AddMaterials from './containers/teacher/add-material';
import AddNewTopic from './containers/teacher/add-new-topic';
import AddNewSubTopic from './containers/teacher/add-new-stopic';
import AddStudyPlan from './containers/teacher/add-study-plan';
import EditTeacher from './containers/institutes/edit-teacher.tsx';
import DeleteTeacher from './containers/institutes/delete-teacher.tsx';

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
    EDIT_MCQ: {
        model: EditMCQ,
        props: { size: '3xl' }
    },
    ADD_STUDY_PLAN: {
        model: AddStudyPlan,
        props: { size: '2xl' }
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
    ADD_TEACHER: {
        model: AddTeacher,
        props: { size: 'xl' }
    },
    ADD_SUBJECT: {
        model: AddSubject,
        props: { size: 'xl' }
    },
    EDIT_SUBJECT: {
        model: EditSubject,
        props: { size: 'xl' }
    },
    DELETE_SUBJECT: {
        model: DeleteSubject
    },
    DELETE_INSTITUTE: {
        model: DeleteInstitute
    },
    ADD_MATERIALS: {
        model: AddMaterials,
        props: { size: '2xl' }
    },
    ADD_NEW_TOPIC: {
        model: AddNewTopic,
        props: { size: '2xl' }
    },
    ADD_NEW_SUB_TOPIC: {
        model: AddNewSubTopic,
        props: { size: '2xl' }
    },
    ADD_MARKS: {
        model: AddMarks,
        props: { size: '2xl' }
    },
    EDIT_TEACHER: {
        model: EditTeacher,
        props: { size: 'xl' }
    },
    DELETE_TEACHER: {
        model: DeleteTeacher,
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
    EDIT_MCQ: 'EDIT_MCQ',
    ADD_STUDY_PLAN: 'ADD_STUDY_PLAN',
    ADD_CLASS: 'ADD_CLASS',
    ADD_STUDENT: 'ADD_STUDENT',
    ADD_STUDENTS: 'ADD_STUDENTS',
    ADD_TEACHER: 'ADD_TEACHER',
    ADD_SUBJECT: 'ADD_SUBJECT',
    EDIT_SUBJECT: 'EDIT_SUBJECT',
    DELETE_SUBJECT: 'DELETE_SUBJECT',
    DELETE_INSTITUTE: 'DELETE_INSTITUTE',
    EDIT_INSTITUTE: 'EDIT_INSTITUTE',
    ADD_MATERIALS: 'ADD_MATERIALS',
    ADD_NEW_TOPIC: 'ADD_NEW_TOPIC',
    ADD_NEW_SUB_TOPIC: 'ADD_NEW_SUB_TOPIC',
    ADD_MARKS: 'ADD_MARKS',
    EDIT_TEACHER: 'EDIT_TEACHER',
};
