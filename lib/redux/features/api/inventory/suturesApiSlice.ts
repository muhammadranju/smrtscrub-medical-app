import { apiSlice } from "../apiSlice";

export const suturesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSutures: builder.query({
      query: () => ({
        url: "sutures",
        method: "GET",
      }),
      providesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    createSuture: builder.mutation({
      query: (payload: { name: string }) => ({
        url: "sutures",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    createSuturesBulk: builder.mutation({
      query: (payload: { items: { name: string }[] }) => ({
        url: "sutures/bulk",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    updateSuture: builder.mutation({
      query: (payload: { id: string; name: string }) => ({
        url: `sutures/${payload.id}`,
        method: "PATCH",
        body: { name: payload.name },
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    deleteSuture: builder.mutation({
      query: (id: string) => ({
        url: `sutures/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetSuturesQuery,
  useCreateSutureMutation,
  useCreateSuturesBulkMutation,
  useUpdateSutureMutation,
  useDeleteSutureMutation,
} = suturesApiSlice;
