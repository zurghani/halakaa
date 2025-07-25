import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus, TaskType } from "./types";
import { dummyTasks } from "./dummy_data/tasks.dummy";

export interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState: dummyTasks,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
    },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
