import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const studyPlanTaskServices = createApi({
    reducerPath: 'study-plan-tasks-service',
    baseQuery: baseQuery,
    tagTypes: ['StudyPlanTasks', 'StudyPlanTask'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/study-plan/task/create`,
                body: props
            }),
            invalidatesTags: ['StudyPlanTasks']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/study-plan/task/delete/${id}`
            }),
            invalidatesTags: ['StudyPlanTasks']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/study-plan/task/update/${id}`,
                body: props
            }),
            invalidatesTags: ['StudyPlanTasks', 'StudyPlanTask']
        }),
        getTierStudyPlanTasks: builder.query({
            query: ({ classId, studyPlanId, ...props }) => ({
                method: 'GET',
                url: `/study-plan/task/${classId}/${studyPlanId}`,
                params: props
            }),
            providesTags: ['StudyPlanTasks']
        })
    })
});

export default studyPlanTaskServices;
