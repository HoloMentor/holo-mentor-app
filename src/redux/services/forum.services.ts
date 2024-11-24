import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';


const forumServices = createApi({
    reducerPath:'forum-service',
    baseQuery:baseQuery,
    tagTypes:['Forums','Forum'],
    endpoints:(builder)=>({
        createMcq:builder.mutation({
            query:(props) => ({
                method:'POST',
                url:`/forum/mcq/create`, 
                body:props
            }),
            invalidatesTags:['Forums']
        }),
        createEssay:builder.mutation({
            query:(props) => ({
                method:'POST',
                url:`/forum/essay/create`,
                body:props
            }),
            invalidatesTags:['Forums']
        }),
        deleteMcq: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/forum/mcq/delete/${id}`
            }),
            invalidatesTags: ['Forums']
        }),
        deleteEssay: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/forum/essay/delete/${id}`
            }),
            invalidatesTags: ['Forums']
        }),
        getQuestions: builder.query({
            query: () => ({
                method: 'GET',
                url: `/forum/all`,
            }),
            providesTags: ['Forums']
        }),
    })
});
export default forumServices;