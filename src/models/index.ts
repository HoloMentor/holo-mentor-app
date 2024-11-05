import loadable from '@loadable/component';

const ProfileUser = loadable(() => import('./containers/profile/user'));
const ProfileInformation = loadable(() => import('./containers/profile/information'));
const ProfileUserInfo = loadable(() => import('./containers/profile/user-info'));
const ProfilePersonalInfo = loadable(() => import('./containers/profile/personal-info'));
const AddStaff = loadable(() => import('./containers/profile/academic-staff/add.tsx'));
const RemoveStaff = loadable(() => import('./containers/profile/academic-staff/remove.tsx'));
const AddMarks = loadable(() => import('./containers/upload-marks'));
const AddInstitute = loadable(() => import('./containers/institutes/add'));
const AddClass = loadable(() => import('./containers/classes/add.tsx'));
const AddStudent = loadable(() => import('./containers/students/add-student'));
const AddStudents = loadable(() => import('./containers/students/add-students'));
const AddTeacher = loadable(() => import('./containers/teacher/add-teacher.tsx'));
const AddSubject = loadable(() => import('./containers/subject/add.tsx'));
const EditSubject = loadable(() => import('./containers/subject/edit.tsx'));
const DeleteSubject = loadable(() => import('./containers/subject/delete.tsx'));
const DeleteInstitute = loadable(() => import('./containers/institutes/delete'));
const EditInstitute = loadable(() => import('./containers/institutes/edit'));
const AddStudyPlan = loadable(() => import('./containers/teacher/add-study-plan'));
const EditTeacher = loadable(() => import('./containers/teacher/edit-teacher.tsx'));
const DeleteTeacher = loadable(() => import('./containers/teacher/delete-teacher.tsx'));
const EditClass = loadable(() => import('./containers/classes/edit.tsx'));
const DeleteClass = loadable(() => import('./containers/classes/delete.tsx'));
const AddMaterials = loadable(() => import('./containers/teacher/material/add.tsx'));
const DeleteMaterial = loadable(() => import('./containers/teacher/material/delete.tsx'));
const AddTopic = loadable(() => import('./containers/teacher/topic/add.tsx'));
const EditTopic = loadable(() => import('./containers/teacher/topic/edit.tsx'));
const DeleteTopic = loadable(() => import('./containers/teacher/topic/delete.tsx'));
const AddSubTopic = loadable(() => import('./containers/teacher/sub-topic/add.tsx'));
const EditSubTopic = loadable(() => import('./containers/teacher/sub-topic/edit.tsx'));
const DeleteSubTopic = loadable(() => import('./containers/teacher/sub-topic/delete.tsx'));

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
    },
    EDIT_CLASS: {
        model: EditClass,
        props: { size: 'xl' }
    },
    DELETE_CLASS: {
        model: DeleteClass,
        props: { size: 'xl' }
    },
    ADD_MATERIALS: {
        model: AddMaterials,
        props: { size: '2xl' }
    },
    DELETE_MATERIAL: {
        model: DeleteMaterial
    },
    ADD_TOPIC: {
        model: AddTopic,
        props: { size: 'xl' }
    },
    EDIT_TOPIC: {
        model: EditTopic,
        props: { size: 'xl' }
    },
    DELETE_TOPIC: {
        model: DeleteTopic
    },
    ADD_SUBTOPIC: {
        model: AddSubTopic,
        props: { size: 'xl' }
    },
    EDIT_SUBTOPIC: {
        model: EditSubTopic,
        props: { size: 'xl' }
    },
    DELETE_SUBTOPIC: {
        model: DeleteSubTopic
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
    ADD_QUESTION: 'ADD_QUESTION',
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
    ADD_MARKS: 'ADD_MARKS',
    EDIT_TEACHER: 'EDIT_TEACHER',
    EDIT_CLASS: 'EDIT_CLASS',
    DELETE_CLASS: 'DELETE_CLASS',
    DELETE_TEACHER: 'DELETE_TEACHER',
    ADD_MATERIALS: 'ADD_MATERIALS',
    DELETE_MATERIAL: 'DELETE_MATERIAL',
    ADD_TOPIC: 'ADD_TOPIC',
    DELETE_TOPIC: 'DELETE_TOPIC',
    EDIT_TOPIC: 'EDIT_TOPIC',
    ADD_SUBTOPIC: 'ADD_SUBTOPIC',
    DELETE_SUBTOPIC: 'DELETE_SUBTOPIC',
    EDIT_SUBTOPIC: 'EDIT_SUBTOPIC'
};
