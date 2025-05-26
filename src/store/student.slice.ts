import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyStudent } from "./dummy_data/student.dummy";
import { Student } from "./types";


const initialState: Student = {
  id: null,
  name: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState: dummyStudent,
  reducers: {
    updateStudent(
      state,
      action: PayloadAction<{
        name?: string;
        gender?: string;
        attendance?: number;
        successRate?: number;
        quranCompletion?: number;
      }>
    ) {
      if (action.payload.name) {
        state.name = action.payload.name;
      }
      if (action.payload.gender) {
        state.gender = action.payload.gender;
      }
    },
  },
});

export const { updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
