// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui.slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});

// Types for usage
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
