import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyClass } from "./dummy_data/class.dummy";
import { Classes } from "./types";



const initialState: Classes = {
  id: null,
  time: {}
};

const classSlice = createSlice({
  name: "class",
  initialState: dummyClass,
  reducers: {
    updateClass(
      state,
      action: PayloadAction<{
        description?: string;
        teacher?: string;
        ageGroup?: string;
        startTime?: string;
        endTime?: string;
        classSize?: number;
      }>
    ) {
      if (action.payload.description) {
        state.description = action.payload.description;
      }
      if (action.payload.teacher) {
        state.teacherId = action.payload.teacher;
      }
      if (action.payload.ageGroup) {
        state.ageGroup = action.payload.ageGroup;
      }
      if (action.payload.startTime) {
        state.time.start = action.payload.startTime;
      }
      if (action.payload.endTime) {
        state.time.end = action.payload.endTime;
      }

    },
  },
});

export const { updateClass } = classSlice.actions;
export default classSlice.reducer;
