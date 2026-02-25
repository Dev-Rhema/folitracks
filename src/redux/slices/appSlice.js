import { createSlice } from "@reduxjs/toolkit";

const getInitialUserInfo = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("userInfo");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const initialState = {
  app_loading: false,
  userInfo: getInitialUserInfo(),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.app_loading = action.payload;
    },

    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },

    logOut: (state) => {
      state.userInfo = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
      // redirect to login page
      window.location.href = "/";
    },
  },
});

export default appSlice.reducer;
export const {
  setAppLoading,
  setUserInfo,
  setCredentials,
  logOut,
  storeDashboardData,
  storeAnalyticsData,
  setSessionExpiring,
} = appSlice.actions;
