import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum UserRole {
  Admin = "admin",
  Teacher = "teacher",
  Parent = "parent",
  Student = "student",
}
export enum SupportedLanguage {
  English = "en",
  Arabic = "ar",
}
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  langauge: SupportedLanguage | null;
  role: UserRole | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  phone: null,
  langauge: null,
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
