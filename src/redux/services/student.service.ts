import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const studentServices = createApi({
    reducerPath: 'student-service',
    baseQuery: baseQuery,
    tagTypes: ['Students', 'Student','StudentsClasses'],
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
        })
    })
});
export default studentServices;
