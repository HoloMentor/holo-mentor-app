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
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/institutes/delete/${id}`
            }),
            invalidatesTags: ['Institutes']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/institutes/update/${id}`,
                body: props
            }),
            invalidatesTags: ['Institutes']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/institutes/${id}`
            }),
            providesTags: ['Institute']
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
