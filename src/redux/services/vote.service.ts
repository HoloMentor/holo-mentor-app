import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base';

const forumServices = createApi({
    reducerPath: 'vote-service',
    baseQuery: baseQuery,
    tagTypes: ['Forums', 'Vote'],
    endpoints: (builder) => ({
        getVotes: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `/forum/votes/${id}/all`
            }),
            providesTags: ['Vote']
        }),
        castVote: builder.mutation({
            query: ({id, userId, voteType}) => ({
                method: 'POST',
                url: `/forum/votes/${id}`,
                body: { userId, voteType }
            }),
            invalidatesTags: ['Vote']
        })
    })
});
export default forumServices;
