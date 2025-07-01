import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyParent } from "./dummy_data/parent.dummy";
import { Parent, Student } from "./types";



const initialState: Parent = {
  uuid: null,
  name: null,
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
    setStudents(state, action: PayloadAction<Student[]>) {
      state.students = action.payload.map((student) => ({
        id: student.id,
        name: student.name,
      }));
    },
  },
});

export const { updateParent, setStudents } =
  parentSlice.actions;
export default parentSlice.reducer;
