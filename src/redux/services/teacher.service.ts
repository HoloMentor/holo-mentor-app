import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const teacherServices = createApi({
    reducerPath: 'teacher-service',
    baseQuery: baseQuery,
    tagTypes: ['Teacher','Teachers','InstituteTeachers'],
    endpoints: (builder) => ({
        create : builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/teachers/create`,
                body: props
            }),
            invalidatesTags: ['Teacher']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/teachers/delete/${id}`
            }),
            invalidatesTags: ['Teacher']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/teachers/update/${id}`,
                body: props
            }),
            invalidatesTags: ['Teacher']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/teachers/${id}`
            }),
            providesTags: ['Teacher']
        }),
        getInstituteTeacher: builder.query({
            query: ({ instituteId, ...params }) => ({
                method: 'GET',
                url: `/teachers/institute/${instituteId}`,
                params
            }),
            providesTags: ['Teacher']
        })
})
});

export default teacherServices;
