import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from 'cookies-next';

interface userProps {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
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
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        role: ''
    }
};

/* export const fetchUser = createAsyncThunk('user/me', async (_, { dispatch }) => {
    if (!sessionStorage.getItem('token')) return null;

    const response = await axios.get(`${config.api_url}users/me`, {
        withCredentials: true
    });

    return response.data.data;
}); */

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
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                role: ''
            };

            deleteCookie('token');
        }
    }
    /*  extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
        });
    } */
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
