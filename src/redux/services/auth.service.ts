import { createApi } from '@reduxjs/toolkit/query/react';
import { noAuthBaseQuery } from '@/redux/services/base';

const authServices = createApi({
    reducerPath: 'auth-service',
    baseQuery: noAuthBaseQuery,
    tagTypes: ['AuthSignIn', 'AuthSignUp', 'AuthUserInstitutes', 'AuthUser', 'AuthUserInvitation'],
    endpoints: (builder) => ({
        me: builder.mutation({
            query: ({ id }) => ({
                method: 'GET',
                url: `/auth/me/${id}`
            }),
            invalidatesTags: ['AuthUser']
        }),
        signIn: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/auth/signin`,
                body: props
            }),
            invalidatesTags: ['AuthSignIn']
        }),
        invitationSignIn: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/auth/signin/invitation`,
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
        }),
        userInvitation: builder.query({
            query: ({ token }) => ({
                method: 'GET',
                url: `/auth/invitation/${token}`
            }),
            providesTags: ['AuthUserInvitation']
        })
    })
});

export default authServices;
