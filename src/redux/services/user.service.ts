import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const userServices = createApi({
    reducerPath: 'user-service',
    baseQuery: baseQuery,
    tagTypes: ['User', 'Users', 'SystemStats'],
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/users/authenticate`,
                body: props
            }),
            invalidatesTags: ['User']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/users/${id}`
            }),
            providesTags: ['User']
        }),
        stats: builder.query({
            query: () => ({
                method: 'GET',
                url: `/users/stats`
            }),
            providesTags: ['SystemStats']
        }),
        all: builder.query({
            query: ({ ...props }) => ({
                method: 'GET',
                url: `/users/all`,
                params: props
            }),
            providesTags: ['Users']
        }),
        updateUser: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/users/update/user/${id}`,
                body: props
            }),
            invalidatesTags: ['User', 'Users']
        }),
        updateInfo: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/users/update/info/${id}`,
                body: props
            }),
            invalidatesTags: ['User', 'Users']
        }),
        suspend: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/users/suspend/${id}`,
                body: props
            }),
            invalidatesTags: ['User', 'Users']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/users/delete/${id}`
            }),
            invalidatesTags: ['Users']
        })
    })
});

export default userServices;
