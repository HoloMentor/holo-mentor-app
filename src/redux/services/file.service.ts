import { createApi } from '@reduxjs/toolkit/query/react';
import { noAuthBaseQuery } from '@/redux/services/base';

const fileServices = createApi({
    reducerPath: 'file-service',
    baseQuery: noAuthBaseQuery,
    endpoints: (builder) => ({
        upload: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/files/upload`,
                body: props
            })
        })
    })
});

export default fileServices;
