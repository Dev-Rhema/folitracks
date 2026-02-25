import { generalApiSlice } from "./apiSlice";

const documentApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadDocument: builder.mutation({
      query: (body) => ({
        url: "/upload",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUploadDocumentMutation } = documentApiSlice;
