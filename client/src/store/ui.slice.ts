// src/store/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  currentPage: {
    title: string;
  }
  isDarkMode: boolean;
  direction: "ltr" | "rtl";
}

const initialState: UIState = {
  currentPage: {
    title: "",
  },
  isDarkMode: localStorage.getItem("isDarkMode") === "true",
  direction: (localStorage.getItem("direction") as "ltr" | "rtl") || "ltr",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
    setDirection(state, action: PayloadAction<"ltr" | "rtl">) {
      state.direction = action.payload;
      localStorage.setItem("direction", action.payload);
    },
    setCurrentPageTitle(state, action: PayloadAction<string>) {
      state.currentPage.title = action.payload;
    },
  },
});

export const { toggleDarkMode, setDirection, setCurrentPageTitle } = uiSlice.actions;
export default uiSlice.reducer;
