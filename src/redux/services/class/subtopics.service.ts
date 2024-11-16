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
                url: `/subtopics/create`,
                body: props
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/subtopics/delete/${id}`
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/subtopics/update/${id}`,
                body: props
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        updateDoneState: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/subtopics/update/state/${id}`,
                body: props
            }),
            invalidatesTags: ['SubClassTopic', 'SubClassTopics']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/subtopics/${id}`
            }),
            providesTags: ['SubClassTopic']
        })
    })
});

export default classSubTopicServices;
