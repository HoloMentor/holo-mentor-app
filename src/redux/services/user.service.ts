import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const userServices = createApi({
    reducerPath: 'user-service',
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/users/authenticate`,
                body: props
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/users/update/user/${id}`,
                body: props
            }),
            invalidatesTags: ['User']
        }),
        updateInfo: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/users/update/info/${id}`,
                body: props
            }),
            invalidatesTags: ['User']
        })
    })
});

export default userServices;
