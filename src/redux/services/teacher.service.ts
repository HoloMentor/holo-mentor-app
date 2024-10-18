import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const teacherServices = createApi({
    reducerPath: 'teacher-service',
    baseQuery: baseQuery,
    tagTypes: ['Teacher', 'Teachers', 'InstituteTeachers', 'TeacherStats', 'TeacherClasses'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/teachers/create`,
                body: props
            }),
            invalidatesTags: ['Teacher', 'InstituteTeachers', 'Teachers']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/teachers/delete/${id}`
            }),
            invalidatesTags: ['Teacher', 'InstituteTeachers']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/teachers/update/${id}`,
                body: props
            }),
            invalidatesTags: ['Teacher', 'InstituteTeachers']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/teachers/${id}`
            }),
            providesTags: ['Teacher']
        }),
        getTeacherStats: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/teachers/stats/${id}`
            }),
            providesTags: ['TeacherStats']
        }),
        getTeacherClasses: builder.query({
            query: ({ id, ...params }) => ({
                method: 'GET',
                url: `/teachers/classes/${id}`,
                params
            }),
            providesTags: ['TeacherClasses']
        }),
        getInstituteTeachers: builder.query({
            query: ({ instituteId, ...params }) => ({
                method: 'GET',
                url: `/teachers/institute/${instituteId}`,
                params
            }),
            providesTags: ['InstituteTeachers']
        })
    })
});

export default teacherServices;
