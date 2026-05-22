import { apiSlice } from "../apiSlice";

export const specialtyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listSpecialties: builder.query({
      query: (params) => ({
        url: "specialties",
        method: "GET",
        params: params,
      }),
      providesTags: ["Specialties"],
      transformResponse: (response: any) => response,
    }),

    createSpecialty: builder.mutation({
      query: (payload) => ({
        url: "specialties",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Specialties"],
      transformResponse: (response: any) => response,
    }),

    updateSpecialty: builder.mutation({
      query: ({ specialtyId, ...payload }) => ({
        url: `specialties/${specialtyId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Specialties"],
      transformResponse: (response: any) => response,
    }),

    deleteSpecialty: builder.mutation({
      query: (specialtyId) => ({
        url: `specialties/${specialtyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Specialties"],
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useListSpecialtiesQuery,
  useCreateSpecialtyMutation,
  useUpdateSpecialtyMutation,
  useDeleteSpecialtyMutation,
} = specialtyApiSlice;
