import { configureStore } from '@reduxjs/toolkit';
import { downloadApi } from './services/downloadApi';

export const store = configureStore({
  reducer: {
    [downloadApi.reducerPath]: downloadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(downloadApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
