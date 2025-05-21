// src/store/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isDarkMode: boolean;
  direction: "ltr" | "rtl";
}

const initialState: UIState = {
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
  },
});

export const { toggleDarkMode, setDirection } = uiSlice.actions;
export default uiSlice.reducer;
