import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const classServices = createApi({
    reducerPath: 'class-service',
    baseQuery: baseQuery,
    tagTypes: ['Class','Classes','InstituteClasses'],
    endpoints: (builder) => ({
        create : builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/classes/create`,
                body: props
            }),
            invalidatesTags: ['Class']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/classes/delete/${id}`
            }),
            invalidatesTags: ['Class']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/classes/update/${id}`,
                body: props
            }),
            invalidatesTags: ['Class']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/classes/${id}`
            }),
            providesTags: ['Class']
        }),
        getInstituteClasses: builder.query({
            query: ({ instituteId, ...params }) => ({
                method: 'GET',
                url: `/classes/institute/${instituteId}`,
                params
            }),
            providesTags: ['Class']
        }),
        getClassesByTeacher: builder.query({
            query: ({ teacherId, ...params }) => ({
                method: 'GET',
                url: `/classes/teacher/${teacherId}`,
                params
            }),
            providesTags: ['Class']
        }),
        getClassByTeacherAndInstitute: builder.query({
            query: ({ teacherId, instituteId }) => ({
                method: 'GET',
                url: `/classes/teacher/${teacherId}/institute/${instituteId}`
            }),
            providesTags: ['Class']
        }),
})
});

export default classServices;