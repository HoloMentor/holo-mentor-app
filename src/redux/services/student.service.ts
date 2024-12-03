import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const studentServices = createApi({
    reducerPath: 'student-service',
    baseQuery: baseQuery,
    tagTypes: ['Students', 'Student', 'StudentsClasses', 'StudentClasses'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/students/create`,
                body: props
            }),
            invalidatesTags: ['Students', 'Student']
        }),
        getClassesStudent: builder.query({
            query: ({ id, ...params }) => ({
                method: 'GET',
                url: `/students/class/${id}`,
                params
            }),
            providesTags: ['StudentsClasses']
        }),
        getStudentClasses: builder.query({
            query: ({ id, ...params }) => ({
                method: 'GET',
                url: `/students/classes`,
                params
            }),
            providesTags: ['StudentClasses']
        }),
        // get study plans for student
        // /students/study-plans/{classId}/{studentId}
        getStudyPlans: builder.query({
            query: ({ classId, studentId }) => ({
                method: 'GET',
                url: `/students/study-plans/${classId}/${studentId}`
            })
        }),

    })
});
export default studentServices;
