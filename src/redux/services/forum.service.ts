import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const forumServices = createApi({
    reducerPath: 'forum-service',
    baseQuery: baseQuery,
    tagTypes: ['Forums', 'Forum'],
    endpoints: (builder) => ({
        createMcq: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/forum/mcq/create`,
                body: props
            }),
            invalidatesTags: ['Forums']
        }),
        createEssay: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/forum/essay/create`,
                body: props
            }),
            invalidatesTags: ['Forums']
        }),
        deleteQuestion: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/forum/delete/${id}`
            }),
            invalidatesTags: ['Forums']
        }),
        getQuestions: builder.query({
            query: () => ({
                method: 'GET',
                url: `/forum/all`
            }),
            providesTags: ['Forums']
        }),
        getSingleQuestion:builder.mutation({
            query: (id) => ({
                method: 'GET',
                url: `/forum/${id}`
            })
        }),
        updateQuestion:builder.mutation({
            query:({id,type,...props}) => ({
                method:'PATCH',
                url:`/forum/${id}/update/${type}`,
                body:props
            })
        }),
    })
});
export default forumServices;
