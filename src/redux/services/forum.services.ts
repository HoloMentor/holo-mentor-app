import { createApi } from '@reduxjs/toolkit/query'
import { baseQuery } from './base';
import { create } from 'domain';

const forumServices = createApi({
    reducerPath:'forum-service',
    baseQuery:baseQuery,
    tagTypes:['Forums','Forum'],
    endpoints:(builder)=>({
        create:builder.mutation({
            query:(props) => ({
                method:'POST',
                url:`/forumquestion/create`,
                body:props
            }),
            invalidatesTags:['Forums']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/forumquestion/delete/${id}`
            }),
            invalidatesTags: ['Forums']
        })
    })
});
export default forumServices;