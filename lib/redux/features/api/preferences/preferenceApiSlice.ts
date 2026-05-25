/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiSlice } from "../apiSlice";

export const preferenceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublicPreferenceCards: builder.query({
      query: (params) => ({
        url: `preference-cards`,
        params: params,
      }),
      providesTags: ["Dashboard"],
      transformResponse: (response: any) => response,
    }),
    getSinglePreferenceCard: builder.query({
      query: (id: string) => ({
        url: `preference-cards/${id}`,
      }),
      providesTags: ["Dashboard"],
      transformResponse: (response: any) => response,
    }),
    updatePreferenceCard: builder.mutation({
      query: ({ id, ...payload }) => ({
        method: "PATCH",
        url: `preference-cards/${id}`,
        body: payload,
      }),
      invalidatesTags: ["Dashboard"],
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGetPublicPreferenceCardsQuery,
  useGetSinglePreferenceCardQuery,
  useUpdatePreferenceCardMutation,
} = preferenceApiSlice;
