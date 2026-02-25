import { generalApiSlice } from "./apiSlice";

const authApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginWithEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      })
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      })
    }),

    verifyUserEmail: builder.mutation({
      query: (body) => ({
        url: "/user/verify-email",
        method: "POST",
        body,
      })
    }),

    getUserQR: builder.query({
      query: () => ({
        url: "/user/qr-code",
        method: "GET",
      })
    })
  }),
  overrideExisting: false
});

export const { useLoginWithEmailMutation, useRegisterUserMutation, useVerifyUserEmailMutation, useGetUserQRQuery } = authApiSlice;
