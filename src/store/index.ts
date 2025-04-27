// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import uiReducer from './ui.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
    },
});

// Types for usage
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
