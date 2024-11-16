import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const classMaterialServices = createApi({
    reducerPath: 'class-material-service',
    baseQuery: baseQuery,
    tagTypes: ['ClassMaterial', 'ClassMaterials'],
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (props) => ({
                method: 'POST',
                url: `/materials/create`,
                body: props
            }),
            invalidatesTags: ['ClassMaterials']
        }),
        delete: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/materials/delete/${id}`
            }),
            invalidatesTags: ['ClassMaterials']
        }),
        update: builder.mutation({
            query: ({ id, ...props }) => ({
                method: 'PATCH',
                url: `/materials/update/${id}`,
                body: props
            }),
            invalidatesTags: ['ClassMaterials']
        })
    })
});

export default classMaterialServices;
