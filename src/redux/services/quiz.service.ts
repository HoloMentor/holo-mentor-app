import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const quizServices = createApi({
    reducerPath: 'quiz-service',
    baseQuery: baseQuery,
    tagTypes: ['Quizzes'],
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: ({ classId, userId }) => ({
                url: `/quiz/${classId}/${userId}/get_quizzes`,
                method: 'GET'
            }),
            providesTags: ['Quizzes']
        })
    })
});

export default quizServices;