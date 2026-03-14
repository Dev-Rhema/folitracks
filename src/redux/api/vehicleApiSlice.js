import { generalApiSlice } from "./apiSlice";

const vehicleApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerVehicle: builder.mutation({
      query: (body) => ({
        url: "/vehicle/register",
        method: "POST",
        body,
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

export const { useRegisterVehicleMutation, useGetVehiclesQuery } = vehicleApiSlice;
