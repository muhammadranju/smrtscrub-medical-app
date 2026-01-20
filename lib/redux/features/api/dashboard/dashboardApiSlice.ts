/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiSlice } from "../apiSlice";

export const dashboardStatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllStats: builder.query({
      query: () => ({
        url: `/dashboard/stats`,
      }),
      providesTags: ["Dashboard"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    getPreferenceCardsMonthly: builder.query({
      query: () => ({
        url: `/dashboard/preference-cards/monthly`,
      }),
      providesTags: ["Dashboard"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    getActiveSubscriptionsMonthly: builder.query({
      query: () => ({
        url: `/dashboard/subscriptions/active/monthly`,
      }),
      providesTags: ["Dashboard"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetAllStatsQuery,
  useGetPreferenceCardsMonthlyQuery,
  useGetActiveSubscriptionsMonthlyQuery,
} = dashboardStatsApiSlice;
