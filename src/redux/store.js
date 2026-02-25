import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import { generalApiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    [generalApiSlice.reducerPath]: generalApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApiSlice.middleware),
});
