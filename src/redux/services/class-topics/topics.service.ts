import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const classTopicServices = createApi({
    reducerPath: 'class-topics-service',
    baseQuery: baseQuery,
    tagTypes: ['ClassTopic', 'ClassTopics'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/topic/create`,
                body: props
            }),
            invalidatesTags: ['ClassTopic', 'ClassTopics']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/topic/delete/${id}`
            }),
            invalidatesTags: ['ClassTopic', 'ClassTopics']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/topic/update/${id}`,
                body: props
            }),
            invalidatesTags: ['ClassTopic', 'ClassTopics']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/topic/${id}`
            }),
            providesTags: ['ClassTopic']
        }),
        getClassTopics: builder.query({
            query: ({ classId }) => ({
                method: 'GET',
                url: `/topic/class/${classId}`
            }),
            providesTags: ['ClassTopics']
        })
    })
});

export default classTopicServices;
