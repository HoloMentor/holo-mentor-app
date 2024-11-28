import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const questionServices = createApi({
    reducerPath: 'question-service',
    baseQuery: baseQuery,
    tagTypes: ['Questions', 'Question'],
    endpoints: (builder) => ({
        createQuestion: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/question/add`,
                body: props
            }),
            invalidatesTags: ['Questions']
        }),
        getAllQuestions: builder.query({
            query: () => ({
                method: 'GET',
                url: `/question/view`
            }),
            providesTags: ['Questions']
        })
    })
});
export default questionServices;