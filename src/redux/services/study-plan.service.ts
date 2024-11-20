import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const studyPlanServices = createApi({
    reducerPath: 'study-plan-service',
    baseQuery: baseQuery,
    tagTypes: ['StudyPlans', 'StudyPlan', 'ClassTiers'],
    endpoints: (builder) => ({
        createTiers: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/study-plan/tiers/create`,
                body: props
            }),
            invalidatesTags: ['ClassTiers']
        })
    })
});

export default studyPlanServices;
