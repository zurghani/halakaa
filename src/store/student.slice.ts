import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyStudent } from "./studentDummy";

export interface StudentState {
    name: string | null;
    id: string | null;
    gender: string | null;
    age: number | null;
    parent: string | null;
    joinDate: string | null;
    attendance: number | null;
    successRate: number | null;
    quranCompletion: number | null;
}

const initialState: StudentState = {
    name: null,
    age: null,
    attendance: null,
    gender: null,
    id: null,
    joinDate: null,
    parent: null,
    quranCompletion: null,
    successRate: null
}

const studentSlice = createSlice({
    name: "student",
    initialState: dummyStudent,
    reducers: {
        updateStudent(
            state,
            action: PayloadAction<{name?: string; gender?: string; attendance?: number; successRate?: number; quranCompletion?: number;}>
        ){
            if(action.payload.name){
                state.name = action.payload.name;
            }
            if(action.payload.gender){
                state.gender = action.payload.gender;
            }
            if(action.payload.attendance){
                state.attendance = action.payload.attendance;
            }
            if(action.payload.successRate){
                state.successRate = action.payload.successRate;
            }
            if(action.payload.quranCompletion){
                state.quranCompletion = action.payload.quranCompletion;
            }

        }


    }
});

export const { updateStudent } = studentSlice.actions;
export default studentSlice.reducer;