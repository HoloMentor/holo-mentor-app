import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const subjectServices = createApi({
    reducerPath: 'subject-service',
    baseQuery: baseQuery,
    tagTypes: ['Subjects', 'Subject', 'InstituteSubjects'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/subjects/create`,
                body: props
            }),
            invalidatesTags: ['Subjects']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/subjects/delete/${id}`
            }),
            invalidatesTags: ['Subjects', 'InstituteSubjects']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/subjects/update/${id}`,
                body: props
            }),
            invalidatesTags: ['Subjects']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/subjects/${id}`
            }),
            providesTags: ['Subject']
        }),
        getInstituteSubjects: builder.query({
            query: ({ instituteId, ...params }) => ({
                method: 'GET',
                url: `/subjects/institute/${instituteId}`,
                params
            }),
            providesTags: ['InstituteSubjects']
        }),
        all: builder.query({
            query: (params) => ({
                method: 'GET',
                url: `/subjects/all`,
                params
            }),
            providesTags: ['Subjects']
        })
    })
});

export default subjectServices;
