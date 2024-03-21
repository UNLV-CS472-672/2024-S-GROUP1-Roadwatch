import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import { appSlice } from './app';

const middlewares = [apiSlice.middleware];

export const store = configureStore({
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(middlewares),
  reducer: {
    api: apiSlice.reducer,
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
