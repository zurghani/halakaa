// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import uiReducer from "./ui.slice";
import userReducer from "./user.slice";
import studentReducer from "./student.slice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    student: studentReducer
  },
});

// Types for usage
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
