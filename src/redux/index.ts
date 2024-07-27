import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import modelReducer from './reducers/model.reducer';

import authServices from './services/auth.service';
import userServices from './services/user.service';

const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        model: modelReducer,
        [authServices.reducerPath]: authServices.reducer,
        [userServices.reducerPath]: userServices.reducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authServices.middleware).concat(userServices.middleware)
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
