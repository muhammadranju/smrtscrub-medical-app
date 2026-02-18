import { apiSlice } from "../apiSlice";

export const suppliesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplies: builder.query({
      query: () => ({
        url: "supplies",
        method: "GET",
      }),
      providesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    createSupply: builder.mutation({
      query: (payload: { name: string }) => ({
        url: "supplies",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    createSuppliesBulk: builder.mutation({
      query: (payload: { items: { name: string }[] }) => ({
        url: "supplies/bulk",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    updateSupply: builder.mutation({
      query: (payload: { id: string; name: string }) => ({
        url: `supplies/${payload.id}`,
        method: "PATCH",
        body: { name: payload.name },
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
    deleteSupply: builder.mutation({
      query: (id: string) => ({
        url: `supplies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetSuppliesQuery,
  useCreateSupplyMutation,
  useCreateSuppliesBulkMutation,
  useUpdateSupplyMutation,
  useDeleteSupplyMutation,
} = suppliesApiSlice;
