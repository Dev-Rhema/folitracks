import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("userInfo");
    const isOtpPending = localStorage.getItem("isOtpPending") === "true";
    const loginMethod = localStorage.getItem("loginMethod");
    const otpEmail = localStorage.getItem("otpEmail");
    
    let userInfo = null;
    try {
      userInfo = savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Error parsing userInfo from localStorage", e);
    }

    return {
      app_loading: false,
      userInfo,
      isOtpPending,
      loginMethod,
      otpEmail,
    };
  }
  return {
    app_loading: false,
    userInfo: null,
    isOtpPending: false,
    loginMethod: null,
    otpEmail: null,
  };
};

const initialState = getInitialState();

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.app_loading = action.payload;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },

    updateUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        user: {
          ...(state.userInfo?.user || {}),
          ...action.payload,
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },

    setOtpPending: (state, action) => {
      state.isOtpPending = action.payload.isOtpPending;
      state.loginMethod = action.payload.loginMethod;
      state.otpEmail = action.payload.otpEmail || null;
      
      localStorage.setItem("isOtpPending", action.payload.isOtpPending);
      if (action.payload.loginMethod) {
        localStorage.setItem("loginMethod", action.payload.loginMethod);
      } else {
        localStorage.removeItem("loginMethod");
      }
      
      if (action.payload.otpEmail) {
        localStorage.setItem("otpEmail", action.payload.otpEmail);
      } else {
        localStorage.removeItem("otpEmail");
      }
    },

    logOut: (state) => {
      state.userInfo = null;
      state.isOtpPending = false;
      state.loginMethod = null;
      state.otpEmail = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("isOtpPending");
        localStorage.removeItem("loginMethod");
        localStorage.removeItem("otpEmail");
      }
    },
  },
});

export default appSlice.reducer;
export const {
  setAppLoading,
  setUserInfo,
  updateUserInfo,
  logOut,
  setOtpPending,
} = appSlice.actions;
