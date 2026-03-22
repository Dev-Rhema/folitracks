import { generalApiSlice } from "./apiSlice";

const serviceHistoryApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminGetServiceHistory: builder.query({
      query: () => ({
        url: "/admin/service-history",
        method: "GET",
      }),
    }),

    adminAddServiceHistory: builder.mutation({
      query: (body) => ({
        url: "/admin/service-history/create",
        method: "POST",
        body,
      }),
    }),

    // adminChangeServiceStatus: builder.mutation({
    //   query: (body) => ({
    //     url: "/admin/service-history/create",
    //     method: "POST",
    //     body,
    //   }),
    // }),

    getServiceHistory: builder.query({
      query: (param) => ({
        url: `/service-history`,
        method: "GET",
        params: param,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAdminGetServiceHistoryQuery, useAdminAddServiceHistoryMutation, useGetServiceHistoryQuery } = serviceHistoryApiSlice;
