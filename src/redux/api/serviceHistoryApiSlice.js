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

    adminDeleteServiceHistory: builder.mutation({
      query: (id) => ({
        url: `/admin/service-history/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceHistory"],
    }),

    adminRescheduleServiceHistory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/service-history/reschedule/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ServiceHistory"],
    }),

    rescheduleServiceHistory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/service-history/reschedule/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ServiceHistory"],
    }),

    setReminderServiceHistory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/service-history/reminder/${id}`,
        method: "PUT",
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

export const { useAdminGetServiceHistoryQuery, useAdminAddServiceHistoryMutation, useGetServiceHistoryQuery, useAdminChangeServiceStatusMutation, useRescheduleServiceHistoryMutation, useAdminRescheduleServiceHistoryMutation, useSetReminderServiceHistoryMutation, useAdminDeleteServiceHistoryMutation } = serviceHistoryApiSlice;
