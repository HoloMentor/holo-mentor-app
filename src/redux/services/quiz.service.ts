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
        reviewQuizAttempt: builder.mutation({
            query: ({ quizId, userId }) => ({
                url: `/quiz/${quizId}/${userId}/review`,
                method: 'POST'
            })
        }),
        getQuestion: builder.query({
            query: ({ questionId }) => ({
                url: `/quiz/question/${questionId}`,
                method: 'GET'
            }),
            providesTags: ['GetQuestion']
        }),
        submitAnswer: builder.mutation<any, { quiz_id: string; questionId: string; userId: string; answer: string }>({
            query: ({ quiz_id, questionId, userId, answer }) => ({
                url: `/quiz/question/${quiz_id}/${questionId}/${userId}/submit`,
                method: 'POST',
                body: { answer }
            })
        }),
        getQuizAnswers: builder.query({
            query: ({ quizId, userId }) => ({
                url: `/quiz/${quizId}/${userId}/answers`,
                method: 'GET'
            })
        }),
        reAttemptQuiz: builder.mutation({
            query: ({ quizId, userId }) => ({
                url: `/quiz/${quizId}/${userId}/reattempt`,
                method: 'GET'
            })
        }),
        generateQuiz: builder.query({
            query: ({ classId, userId }) => ({
                url: `/quiz/generate-quiz/${classId}/${userId}`,
                method: 'GET'
            })
        }),
        endQuizAttempt: builder.mutation({
            query: ({ quizId, userId }) => ({
                url: `/quiz/${quizId}/${userId}/end-attempt`,
                method: 'GET'
            })
        }),
    })
});

export default quizServices;