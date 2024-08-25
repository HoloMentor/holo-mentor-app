import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import modelReducer from './reducers/model.reducer';

import authServices from './services/auth.service';
import userServices from './services/user.service';
import notifyReducer from './reducers/notify.reducer';
import instituteServices from './services/institute.service';
import fileServices from './services/file.service';
import subjectServices from '@/redux/services/subject.service.ts';

const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        model: modelReducer,
        notify: notifyReducer,
        [authServices.reducerPath]: authServices.reducer,
        [userServices.reducerPath]: userServices.reducer,
        [instituteServices.reducerPath]: instituteServices.reducer,
        [fileServices.reducerPath]: fileServices.reducer,
        [subjectServices.reducerPath]: subjectServices.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authServices.middleware)
            .concat(userServices.middleware)
            .concat(instituteServices.middleware)
            .concat(fileServices.middleware)
            .concat(subjectServices.middleware)
});

export default store;

export type IAppDispatch = typeof store.dispatch;

export type IRootState = ReturnType<typeof store.getState>;
