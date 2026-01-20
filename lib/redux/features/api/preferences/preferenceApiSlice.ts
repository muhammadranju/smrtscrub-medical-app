/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiSlice } from "../apiSlice";

export const preferenceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublicPreferenceCards: builder.query({
      query: () => ({
        url: `/preference-card/public`,
      }),
      providesTags: ["Dashboard"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    getSinglePreferenceCard: builder.query({
      query: (id: string) => ({
        url: `/preference-card/${id}`,
      }),
      providesTags: ["Dashboard"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    updatePreferenceCardApproval: builder.mutation({
      query: (id: string) => ({
        method: "PATCH",
        url: `/preference-card/${id}/approve`,
      }),
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    updatePreferenceCardReject: builder.mutation({
      query: (id: string) => ({
        method: "PATCH",
        url: `/preference-card/${id}/reject`,
      }),
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetPublicPreferenceCardsQuery,
  useGetSinglePreferenceCardQuery,
  useUpdatePreferenceCardApprovalMutation,
  useUpdatePreferenceCardRejectMutation,
} = preferenceApiSlice;
