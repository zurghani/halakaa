import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyParent } from "./dummy_data/parent.dummy";

export interface ParentState {
  id: string | null;
  name: string | null;
  students: string[];
}

const initialState: ParentState = {
  id: null,
  name: null,
  students: [],
};

const parentSlice = createSlice({
  name: "parent",
  initialState: dummyParent,
  reducers: {
    updateParent(
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

export const { updateParent, addStudent, removeStudent } =
  parentSlice.actions;
export default parentSlice.reducer;
