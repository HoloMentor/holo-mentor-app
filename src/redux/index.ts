import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import userServices from './services/user.service';

export default configureStore({
    reducer: combineReducers({
        user: userReducer,
        [userServices.reducerPath]: userServices.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userServices.middleware)
});
