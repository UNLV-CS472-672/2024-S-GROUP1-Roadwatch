import { configureStore } from '@reduxjs/toolkit';
import { user } from './user';

const middlewares: any[] = [user.middleware];

export const store = configureStore({
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(middlewares),
  reducer: {
    user: user.reducer,
  },
});
