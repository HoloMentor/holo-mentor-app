import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const userServices = createApi({
    reducerPath: 'user-service',
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/user/authenticate`,
                body: props
            }),
            invalidatesTags: ['User']
        }),
        all: builder.query({
            query: ({ org_id, date }) => ({
                method: 'GET',
                url: `/dashboard/${org_id}/analytics`,
                params: { date }
            })
        })
    })
});

export default userServices;
