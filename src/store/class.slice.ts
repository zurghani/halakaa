import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyClass } from "./dummy_data/class.dummy";

export interface ClassState {
    id: string | null;
    description: string | null;
    teacher: string | null;
    ageGroup: string | null;
    startTime: string | null;
    endTime: string | null;
    classSize: number | null;
}

const initialState: ClassState = {
    id: null,
    description: null,
    teacher: null,
    ageGroup: null,
    startTime: null,
    endTime: null,
    classSize: null,
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
                state.teacher = action.payload.teacher;
            }
            if (action.payload.ageGroup) {
                state.ageGroup = action.payload.ageGroup;
            }
            if (action.payload.startTime) {
                state.startTime = action.payload.startTime;
            }
            if (action.payload.endTime) {
                state.endTime = action.payload.endTime;
            }
            if (action.payload.classSize) {
                state.classSize = action.payload.classSize;
            }
        },
    },
});

export const { updateClass } = classSlice.actions;
export default classSlice.reducer;
