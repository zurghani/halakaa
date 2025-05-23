import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyTeacher } from "./dummy_data/teacher.dummy";

export interface TeacherState {
  id: string | null;
  name: string | null;
  students: string[];
}

const initialState: TeacherState = {
  id: null,
  name: null,
  students: [],
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState: dummyTeacher,
  reducers: {
    updateTeacher(
      state,
      action: PayloadAction<{
        name?: string;
      }>
    ) {
      if (action.payload.name) {
        state.name = action.payload.name;
      }
    },
    addStudent(state, action: PayloadAction<string>) {
      state.students.push(action.payload);
    },
    removeStudent(state, action: PayloadAction<string>) {
      state.students = state.students.filter(
        (student: any) => student !== action.payload
      );
    },
  },
});

export const { updateTeacher, addStudent, removeStudent } =
  teacherSlice.actions;
export default teacherSlice.reducer;
