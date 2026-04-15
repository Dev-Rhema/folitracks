import { generalApiSlice } from "./apiSlice";

const serviceHistoryApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminGetServiceHistory: builder.query({
      query: (param) => ({
        url: "/admin/service-history",
        method: "GET",
        params: param,
      }),
      providesTags: ["ServiceHistory"],
    }),

    adminAddServiceHistory: builder.mutation({
      query: (body) => ({
        url: "/admin/service-history/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ServiceHistory"],
    }),

    adminChangeServiceStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/service-history/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ServiceHistory"],
    }),

    getServiceHistory: builder.query({
      query: (param) => ({
        url: `/service-history`,
        method: "GET",
        params: param,
      }),
      providesTags: ["ServiceHistory"],
    }),
  }),
  overrideExisting: false,
});

export const { useAdminGetServiceHistoryQuery, useAdminAddServiceHistoryMutation, useGetServiceHistoryQuery, useAdminChangeServiceStatusMutation } = serviceHistoryApiSlice;
