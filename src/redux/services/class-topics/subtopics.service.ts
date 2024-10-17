import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const classSubTopicServices = createApi({
    reducerPath: 'class-sub-topics-service',
    baseQuery: baseQuery,
    tagTypes: ['SubClassTopic', 'SubClassTopics'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/subtopic/create`,
                body: props
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/subtopic/delete/${id}`
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/subtopic/update/${id}`,
                body: props
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/subtopic/${id}`
            }),
            providesTags: ['SubClassTopic']
        })
    })
});

export default classSubTopicServices;
