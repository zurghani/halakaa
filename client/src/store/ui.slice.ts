// src/store/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    currentPage: {
        title: string;
    };
    isDarkMode: boolean;
}

const initialState: UIState = {
    currentPage: {
        title: "",
    },
    isDarkMode: localStorage.getItem("isDarkMode") === "true",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
        },
        setCurrentPageTitle(state, action: PayloadAction<string>) {
            state.currentPage.title = action.payload;
        },
    },
});

export const { toggleDarkMode, setCurrentPageTitle } = uiSlice.actions;
export default uiSlice.reducer;
