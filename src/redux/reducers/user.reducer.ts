import config from '@/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface userProps {
    userInstituteId?: string;
    instituteId?: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    userRole: string;
    instituteRole?: string;
    [prop: string]: string | boolean | number;
}

interface actionsProps {
    payload: userProps;
}

export interface userStateProps {
    loading?: boolean;
    logged: boolean;
    user: userProps;
}

const logged = getCookie('token') ? true : false;

const initState: userStateProps = {
    loading: true,
    logged: logged,
    user: {
        userInstituteId: '',
        instituteId: '',
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        userRole: '',
        instituteRole: ''
    }
};

export const authorizeUser = createAsyncThunk('auth/me', async (_, { dispatch }) => {
    const token = getCookie('token');

    if (!token) return null;
    const data: any = jwtDecode(token);

    const response = await axios.get(`${config.api_url}auth/me/${data.sub}`, {
        withCredentials: true
    });

    return {
        userId: response.data?.data?.user_id,
        instituteId: response.data?.data?.institute_id,
        userInstituteId: response.data?.data?.user_institute_id,
        email: response.data?.data?.email,
        firstName: response.data?.data?.first_name,
        lastName: response.data?.data?.last_name,
        userRole: response.data?.data?.user_role,
        instituteRole: response.data?.data?.institute_role
    };
});

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        set(state, { payload }: actionsProps) {
            state.user = payload;
            state.loading = false;
            state.logged = true;
        },
        remove(state) {
            /* axios.post(`${config.api_url}user/revoke-token`, {
                withCredentials: true
            }); */

            state.logged = false;
            state.user = {
                userInstituteId: '',
                instituteId: '',
                userId: '',
                email: '',
                firstName: '',
                lastName: '',
                userRole: '',
                instituteRole: ''
            };

            deleteCookie('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authorizeUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(authorizeUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(authorizeUser.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
