import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const commentServices = createApi({
    reducerPath: 'comment-service',
    baseQuery: baseQuery,
    tagTypes: ['Forums', 'Comment'],
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: ({questionId, userId, reply}) => ({
                method: 'POST',
                url: `/comments/add`,
                body: { questionId, userId, reply }
            }),
            invalidatesTags: ['Comment']
        }),
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/forum/delete/${id}`
            }),
            invalidatesTags: ['Forums']
        }),
        getComment: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `/comments/${id}`
            }),
            providesTags: ['Forums']
        })
    })
});
export default commentServices;
