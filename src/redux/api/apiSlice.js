import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { logOut } from "../slices/appSlice";

export const appApiHeader = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

export const getBaseUrl = () =>
  "https://api.folitracks.com";

// Base query setup
const rawBaseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  // allow params to be able to accept an array
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(`${key}[]`, v));
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    return searchParams.toString();
  },
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const userInfo = state?.app?.userInfo;

    const token = userInfo?.authResponse?.accessToken || userInfo?.accessToken || userInfo?.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Run the initial query
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error && result.error.status === 401) {
    api.dispatch(logOut());
    // if (window.location.pathname.includes("/admin")) {
    //   window.location.replace("/admin/login");
    // } else {
    //   window.location.replace("/login");
    // }
  }

  return result;
};

export const generalApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "api",
  tagTypes: ["Vehicle"],
  endpoints: (builder) => ({}),
});
