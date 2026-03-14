import { generalApiSlice } from "./apiSlice";

const serviceHistoryApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addServiceHistory: builder.mutation({
      query: (body) => ({
        url: "/service-history",
        method: "POST",
        body,
      }),
    }),

    getServiceHistory: builder.query({
     query: () => ({
        url: "/service-history",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddServiceHistoryMutation, useGetServiceHistoryQuery } = serviceHistoryApiSlice;
