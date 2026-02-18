import { apiSlice } from "../apiSlice";

export const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getSubscriptionStats: builder.query({
      query: () => "/subscriptions/stats",
      providesTags: ["Subscription"],
    }),
    getSubscriptionPlans: builder.query({
      query: () => "/subscriptions/plans",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetSubscriptionStatsQuery, useGetSubscriptionPlansQuery } =
  subscriptionApiSlice;
