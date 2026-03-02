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

    loginByQrUpload: builder.mutation({
      query: (body) => ({
        url: "/auth/upload-qr",
        method: "POST",
        body,
      })
    }),

    sendLoginOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/send-login-otp",
        method: "POST",
        body,
      })
    }),

    verifyLoginOTP: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-login-otp",
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

export const { useLoginWithEmailMutation, useRegisterUserMutation, useVerifyUserEmailMutation, useGetUserQRQuery, useLoginByQrUploadMutation, useSendLoginOTPMutation, useVerifyLoginOTPMutation } = authApiSlice;
