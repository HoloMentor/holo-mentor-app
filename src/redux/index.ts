import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import modelReducer from './reducers/model.reducer';

import authServices from './services/auth.service';
import userServices from './services/user.service';
import notifyReducer from './reducers/notify.reducer';
import instituteServices from './services/institute.service';
import fileServices from './services/file.service';
import subjectServices from '@/redux/services/subject.service.ts';
import classServices from '@/redux/services/class/class.service';
import teacherServices from './services/teacher.service';
import classTopicServices from './services/class/topics.service';
import classSubTopicServices from './services/class/subtopics.service';
import classMaterialServices from './services/class/materials.service';
import studyPlanServices from './services/study-plan/study-plan.service';
import staffServices from './services/staff.service';
import studentServices from './services/student.service';
import studyPlanTaskServices from './services/study-plan/tasks.service';
import forumServices from './services/forum.services';

const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        model: modelReducer,
        notify: notifyReducer,
        [authServices.reducerPath]: authServices.reducer,
        [userServices.reducerPath]: userServices.reducer,
        [instituteServices.reducerPath]: instituteServices.reducer,
        [fileServices.reducerPath]: fileServices.reducer,
        [subjectServices.reducerPath]: subjectServices.reducer,
        [classServices.reducerPath]: classServices.reducer,
        [teacherServices.reducerPath]: teacherServices.reducer,
        [forumServices.reducerPath]: forumServices.reducer,
        [classTopicServices.reducerPath]: classTopicServices.reducer,
        [studyPlanServices.reducerPath]: studyPlanServices.reducer,
        [classSubTopicServices.reducerPath]: classSubTopicServices.reducer,
        [classMaterialServices.reducerPath]: classMaterialServices.reducer,
        [staffServices.reducerPath]: staffServices.reducer,
        [studentServices.reducerPath]: studentServices.reducer,
        [studyPlanTaskServices.reducerPath]: studyPlanTaskServices.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authServices.middleware)
            .concat(userServices.middleware)
            .concat(instituteServices.middleware)
            .concat(fileServices.middleware)
            .concat(subjectServices.middleware)
            .concat(classServices.middleware)
            .concat(teacherServices.middleware)
            .concat(classTopicServices.middleware)
            .concat(classSubTopicServices.middleware)
            .concat(classMaterialServices.middleware)
            .concat(studyPlanServices.middleware)
            .concat(staffServices.middleware)
            .concat(studentServices.middleware)
            .concat(studyPlanTaskServices.middleware)
            .concat(forumServices.middleware)
});

export default store;

export type IAppDispatch = typeof store.dispatch;

export type IRootState = ReturnType<typeof store.getState>;
