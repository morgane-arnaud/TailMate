import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cat, VoteRequest, VoteResponse } from '@/types/cat.types';
import { CAT_API_KEY } from '@env';

// Create the API slice
export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1/',
    prepareHeaders: (headers) => {
      const apiKey = CAT_API_KEY;
      headers.set('x-api-key', apiKey);
      return headers;
    },
  }),
  tagTypes: ['Cat'],
  endpoints: (builder) => ({
    // Get cats for the feed
    getCats: builder.query<Cat[], { limit?: number; page?: number }>({
      query: ({ limit = 10, page = 0 } = {}) => ({
        url: 'images/search',
        params: {
          limit,
          page,
          order: 'RAND',
          has_breeds: 1, // Only cats with breed information
          include_breeds: true,
        },
      }),
      providesTags: ['Cat'],
    }),

    // Vote for a cat
    voteForCat: builder.mutation<VoteResponse, VoteRequest>({
      query: (voteData) => ({
        url: 'votes',
        method: 'POST',
        body: voteData,
      }),
    }),
  }),
});

export const { useGetCatsQuery, useVoteForCatMutation } = catApi;
