import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TagsState {
    roles: string[];
    ageGroups: string[];
    taskTypes: string[];
    attendanceStatus: string[];
}

const initialState: TagsState = {
    roles: ["admin", "teacher", "parent", "student"], //TODO: ACTUALLY PULL ROLES FROM DB
    ageGroups: ["2 - 4", "5 - 7", "8 - 10", "11 - 13", "14 - 16"],
    taskTypes: ["memorization", "revision", "reciting"],
    attendanceStatus: ["present", "absent", "late"],
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        setRoles: (state, action: PayloadAction<string[]>) => {
            state.roles = action.payload;
        },
        setAgeGroups: (state, action: PayloadAction<string[]>) => {
            state.ageGroups = action.payload;
        },
        setTaskTypes: (state, action: PayloadAction<string[]>) => {
            state.taskTypes = action.payload;
        },
    },
});

export const { setRoles, setAgeGroups, setTaskTypes } = tagsSlice.actions;
export default tagsSlice.reducer;
