import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserRole } from "./types";


const initialState: User = {
  uuid: null,
  name: null,
  email: null,
  role: null,
};
// place holder
// only an example, not an actual implementation
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(
      state,
      action: PayloadAction<{ name?: string; email?: string }>
    ) {
      if (action.payload.name) {
        state.name = action.payload.name;
      }
      if (action.payload.email) {
        state.email = action.payload.email;
      }
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
