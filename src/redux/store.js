import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreApi } from './services/ShazamCore';
import playerReducer from './features/PlayerSlice';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});