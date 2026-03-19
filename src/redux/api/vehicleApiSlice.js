import { generalApiSlice } from "./apiSlice";

const vehicleApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    adminGetVehicles: builder.query({
      query: (params) => ({
        url: "/admin/vehicle",
        method: "GET",
        params,
      }),
      providesTags: ["Vehicle"],
    }),


    registerVehicle: builder.mutation({
      query: (body) => ({
        url: "/vehicle/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vehicle"],
    }),

    editVehicle: builder.mutation({
      query: ({ body, id }) => ({
        url: `/vehicle/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Vehicle"],
    }),


    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicle/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),

    getVehicles: builder.query({
      query: (params) => ({
        url: "/vehicle",
        method: "GET",
        params,
      }),
      providesTags: ["Vehicle"],
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterVehicleMutation, useGetVehiclesQuery, useAdminGetVehiclesQuery, useEditVehicleMutation, useDeleteVehicleMutation } = vehicleApiSlice;
