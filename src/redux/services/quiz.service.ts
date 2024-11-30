import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/redux/services/base';

const quizServices = createApi({
    reducerPath: 'quiz-service',
    baseQuery: baseQuery,
    tagTypes: ['Quizzes', 'AttemptQuiz', 'GetQuestion'],
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: ({ classId, userId }) => ({
                url: `/quiz/${classId}/${userId}/get_quizzes`,
                method: 'GET'
            }),
            providesTags: ['Quizzes']
        }),
        startQuizAttempt: builder.mutation({
            query: ({ quizId, userId }) => ({
                url: `/quiz/${quizId}/${userId}/start-attempt`,
                method: 'POST'
            })
        }),
        getQuestion: builder.query({
            query: ({ questionId }) => ({
                url: `/quiz/question/${questionId}`,
                method: 'GET'
            }),
            providesTags: ['GetQuestion']
        })
    })
});

export default quizServices;