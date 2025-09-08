// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui.slice";
import tagsReducer from "./tags.slice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        tags: tagsReducer,
    },
});

// Types for usage
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
