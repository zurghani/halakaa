// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import uiReducer from "./ui.slice";
import userReducer from "./user.slice";
import studentReducer from "./student.slice";
import classReducer from "./class.slice";
import parentReducer from "./parent.slice";
import tasksReducer from "./tasks.slice";
import tagsReducer from "./tags.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        user: userReducer,
        student: studentReducer,
        class: classReducer,
        parent: parentReducer,
        tasks: tasksReducer,
        tags: tagsReducer,
    },
});

// Types for usage
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
