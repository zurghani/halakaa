import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyStudent } from "./dummy_data/student.dummy";

export interface StudentState {
  id: string | null;
  name: string | null;
  age: number | null;
  gender: string | null;
  parent: string | null;
  joinDate: string | null;
  stats: {
    attendance: number | null;
    successRate: number | null;
    quranCompletion: number | null;
  };
}

const initialState: StudentState = {
  id: null,
  name: null,
  age: null,
  gender: null,
  parent: null,
  joinDate: null,
  stats: {
    attendance: null,
    successRate: null,
    quranCompletion: null,
  },
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
      if (action.payload.attendance) {
        state.stats.attendance = action.payload.attendance;
      }
      if (action.payload.successRate) {
        state.stats.successRate = action.payload.successRate;
      }
      if (action.payload.quranCompletion) {
        state.stats.quranCompletion = action.payload.quranCompletion;
      }
    },
  },
});

export const { updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
