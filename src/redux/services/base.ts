import config from '@/config';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie } from 'cookies-next';

type QueryReturnValue<T = any, E = any, M = unknown> =
    | {
          error: E;
          data?: undefined;
      }
    | {
          error?: undefined;
          data?: T;
      };

export const fetchQuery = fetchBaseQuery({
    baseUrl: config.api_url,
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getCookie('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    }
});

export const noAuthBaseQuery = fetchBaseQuery({
    baseUrl: config.api_url,
    credentials: 'include'
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result;
    try {
        result = await fetchQuery(args, api, extraOptions);

        if (result?.error && result?.error?.status === 401) {
            // try to get a new token using the refresh token
            const refreshResult: QueryReturnValue = await noAuthBaseQuery(
                {
                    method: 'POST',
                    url: '/auth/refresh',
                    credentials: 'include'
                },
                api,
                extraOptions
            );
            console.log(refreshResult);
            if (refreshResult?.data?.data?.access_token) {
                // store the new token
                setCookie('token', refreshResult.data.data.access_token);
                // retry the initial query
                result = await fetchQuery(args, api, extraOptions);
            } else {
                // refresh failed - redirect to login
                window.location.assign('/');
            }
        }
    } catch (error) {
        console.error(error);
    }

    return result;
};
