import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyClasses } from "./dummy_data/class.dummy";
import { Classes } from "./types";


const classSlice = createSlice({
  name: "class",
  initialState: dummyClasses,
  reducers: {
  },
});

export default classSlice.reducer;
