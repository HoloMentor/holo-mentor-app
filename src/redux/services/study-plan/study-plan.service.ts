import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const studyPlanServices = createApi({
    reducerPath: 'study-plan-service',
    baseQuery: baseQuery,
    tagTypes: ['StudyPlans', 'StudyPlan', 'ClassTiers', 'StudyPlanTasks'],
    endpoints: (builder) => ({
        createTiers: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/study-plan/tiers/create`,
                body: props
            }),
            invalidatesTags: ['ClassTiers']
        }),
        createPlan: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/study-plan/create`,
                body: props
            }),
            invalidatesTags: ['StudyPlans']
        }),
        getCSV: builder.mutation({
            query: ({ classId }) => ({
                method: 'GET',
                url: `/study-plan/csv/${classId}`
            })
        }),
        getTierStudyPlans: builder.query({
            query: ({ classId, tier, ...props }) => ({
                method: 'GET',
                url: `/study-plan/${classId}/${tier}`,
                params: props
            }),
            providesTags: ['StudyPlans']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/study-plan/delete/${id}`
            }),
            invalidatesTags: ['StudyPlans']
        })
    })
});

export default studyPlanServices;
