// staff.service.ts

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const staffServices = createApi({
    reducerPath: 'staff-service',
    baseQuery: baseQuery,
    tagTypes: ['Staff', 'InstituteTeacherStaff'],
    endpoints: (builder) => ({
        createStaff: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/staff/create`,
                body: props
            }),
            invalidatesTags: ['Staff', 'InstituteTeacherStaff']
        }),
        getInstituteTeacherStaff: builder.query({
            query: ({ instituteId, teacherId, search = '', page = 1, limit = 5 }) => ({
                method: 'GET',
                url: `/staff/${instituteId}/${teacherId}`,
                params: { search, page, limit }
            }),
            providesTags: ['InstituteTeacherStaff']
        }),
        getStaff: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/staff/${id}`
            }),
            providesTags: ['Staff']
        }),
        getTeacherStaff: builder.query({
            query: ({ userId,instituteId }) => ({
                method: 'GET',
                url: `/staff/teacher/${userId}/${instituteId}`,
               
            }),
            providesTags: ['Staff', 'InstituteTeacherStaff']
        }),
        getTeacherStaffCount: builder.query({
            query: ({ userId,instituteId }) => ({
                method: 'GET',
                url: `/staff/teacher/count/${userId}/${instituteId}`,
               
            }),
            providesTags: ['Staff', 'InstituteTeacherStaff']
        }),
        deleteStaff: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: `/staff/${id}`
            }),
            invalidatesTags: ['Staff', 'InstituteTeacherStaff']
        })
    })
});

export default staffServices;

export const {
    useCreateStaffMutation,
    useGetInstituteTeacherStaffQuery,
    useGetStaffQuery,
    useGetTeacherStaffQuery,
    useGetTeacherStaffCountQuery,
    useDeleteStaffMutation

} = staffServices;
