import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const announcementServices = createApi({
    reducerPath: 'announcement-service',
    baseQuery: baseQuery,
    tagTypes: ['Announcement', 'Announcements'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/announcement/create`,
                body: props
            }),
            invalidatesTags: ['Announcement', 'Announcements']
        }),

        get: builder.query({
            query: ({ id }) => ({
                method: 'GET',
                url: `/announcement/all/${id}`
            }),
            providesTags: ['Announcement']
        }),

        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/announcement/delete/${id}`
            }),
            invalidatesTags: ['Announcement']
        }),
    })
});

export default announcementServices;
