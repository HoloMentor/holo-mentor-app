import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import config from '@/config';
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
        const lang = getState().system.lang || 'en';
        const token = getCookie('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        // en, si, ta
        headers.set('Accept-Language', lang);
        return headers;
    }
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result;
    try {
        result = await fetchQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            // try to get a new token using the refresh token
            const refreshResult: QueryReturnValue = await fetchQuery(
                {
                    method: 'POST',
                    url: '/user/refresh-token',
                    credentials: 'include'
                },
                api,
                extraOptions
            );

            if (refreshResult?.data?.jwtToken) {
                // store the new token
                setCookie('token', refreshResult.data.jwtToken);
                // retry the initial query
                result = await fetchQuery(args, api, extraOptions);
            } else {
                // refresh failed - redirect to login
                window.location.assign('/');
            }
        }
    } catch (error) {}

    return result;
};