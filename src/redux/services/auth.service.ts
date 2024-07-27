import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const authServices = createApi({
    reducerPath: 'auth-service',
    baseQuery: baseQuery,
    tagTypes: ['AuthSignIn', 'AuthSignUp', 'AuthUserInstitutes'],
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/auth/signin`,
                body: props
            }),
            invalidatesTags: ['AuthSignIn']
        }),
        signUp: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/auth/signup`,
                body: props
            }),
            invalidatesTags: ['AuthSignUp']
        }),
        userInstitutes: builder.query({
            query: ({ email }) => ({
                method: 'GET',
                url: `/auth/institutes/${email}`
            }),
            providesTags: ['AuthUserInstitutes']
        })
    })
});

export default authServices;
