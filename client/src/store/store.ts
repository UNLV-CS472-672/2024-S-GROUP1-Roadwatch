import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';

const middlewares = [apiSlice.middleware];

export const store = configureStore({
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(middlewares),
  reducer: {
    api: apiSlice.reducer,
  },
});
