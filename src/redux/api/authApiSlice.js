import { generalApiSlice } from "./apiSlice";

const authApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/admin/login",
        method: "POST",
        body,
      })
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/user/logout",
        method: "POST",
      })
    }),

    logoutAdmin: builder.mutation({
      query: () => ({
        url: "/auth/admin/logout",
        method: "POST",
      })
    }),

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
    }),

    adminGetUserQR: builder.query({
      query: (id) => ({
        url: `/admin/user/${id}/qr-code`,
        method: "GET",
      })
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/user/update-profile",
        method: "PUT",
        body,
      })
    }),
  }),
  overrideExisting: false
});

export const { useAdminLoginMutation, useLoginWithEmailMutation, useRegisterUserMutation, useVerifyUserEmailMutation, useGetUserQRQuery, useLoginByQrUploadMutation, useSendLoginOTPMutation, useVerifyLoginOTPMutation, useLogoutUserMutation, useLogoutAdminMutation, useAdminGetUserQRQuery, useUpdateProfileMutation } = authApiSlice;
