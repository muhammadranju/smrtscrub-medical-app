import { apiSlice } from "../apiSlice";

export const doctorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorProfile: builder.query({
      query: (payload: any) => ({
        url: `user/${payload.userId}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
      transformResponse: (response) => response,
    }),

    updateDoctorProfileStatus: builder.mutation({
      query: (payload: any) => ({
        url: `user/${payload.userId}/status`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response) => response,
    }),

    deleteDoctorProfile: builder.mutation({
      query: (payload: any) => ({
        url: `user/${payload.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response) => response,
    }),
    updateDoctorProfile: builder.mutation({
      query: (payload: any) => ({
        url: `user/${payload.userId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useUpdateDoctorProfileStatusMutation,
  useDeleteDoctorProfileMutation,
  useUpdateDoctorProfileMutation,
  useGetDoctorProfileQuery,
} = doctorsApiSlice;
