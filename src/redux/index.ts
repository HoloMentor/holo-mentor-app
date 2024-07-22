import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import modelReducer from './reducers/model.reducer';

import userServices from './services/user.service';

const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        model: modelReducer,
        [userServices.reducerPath]: userServices.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userServices.middleware)
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
