import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const instituteServices = createApi({
    reducerPath: 'institute-service',
    baseQuery: baseQuery,
    tagTypes: ['Institutes', 'Institute'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/institutes/create`,
                body: props
            }),
            invalidatesTags: ['Institutes']
        }),
        all: builder.query({
            query: (params) => ({
                method: 'GET',
                url: `/institutes/all`,
                params
            }),
            providesTags: ['Institutes']
        })
    })
});

export default instituteServices;
