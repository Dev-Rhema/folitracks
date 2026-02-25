import { generalApiSlice } from "./apiSlice";

const vehicleApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerVehicle: builder.mutation({
      query: (body) => ({
        url: "/vehicle/register",
        method: "POST",
        body, // body is now a JSON object containing base64 strings for files
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterVehicleMutation } = vehicleApiSlice;
