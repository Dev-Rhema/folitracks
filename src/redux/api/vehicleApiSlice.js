import { generalApiSlice } from "./apiSlice";

const vehicleApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    adminGetVehicles: builder.query({
      query: () => ({
        url: "/admin/vehicle",
        method: "GET",
      }),
    }),


    registerVehicle: builder.mutation({
      query: (body) => ({
        url: "/vehicle/register",
        method: "POST",
        body,
      }),
    }),

    editVehicle: builder.mutation({
      query: ({ body, id }) => ({
        url: `/vehicle/${id}`,
        method: "PUT",
        body,
      }),
    }),


    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicle/${id}`,
        method: "DELETE",
      }),
    }),

    getVehicles: builder.query({
      query: () => ({
        url: "/vehicle",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterVehicleMutation, useGetVehiclesQuery, useAdminGetVehiclesQuery, useEditVehicleMutation, useDeleteVehicleMutation } = vehicleApiSlice;
