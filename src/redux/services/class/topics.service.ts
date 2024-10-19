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
                url: `/topics/create`,
                body: props
            }),
            invalidatesTags: ['ClassTopic', 'ClassTopics']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/topics/delete/${id}`
            }),
            invalidatesTags: ['ClassTopic', 'ClassTopics']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/topics/update/${id}`,
                body: props
            }),
            invalidatesTags: ['ClassTopic', 'ClassTopics']
        }),
        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/topics/${id}`
            }),
            providesTags: ['ClassTopic']
        }),
        getClassTopics: builder.query({
            query: ({ classId, ...params }) => ({
                method: 'GET',
                url: `/topics/class/${classId}`,
                params
            }),
            providesTags: ['ClassTopics']
        })
    })
});

export default classTopicServices;
