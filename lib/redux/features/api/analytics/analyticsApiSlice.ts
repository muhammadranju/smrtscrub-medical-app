import { apiSlice } from "../apiSlice";

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder:any) => ({
    getAnalyticsStats: builder.query({
      query: () => "/analytics/stats",
      providesTags: ["Analytics"],
    }),
    getPopularProcedures: builder.query({
      query: () => "/analytics/procedures/popular",
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetAnalyticsStatsQuery, useGetPopularProceduresQuery } =
  analyticsApiSlice;
