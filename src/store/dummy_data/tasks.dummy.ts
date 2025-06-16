import { TasksState } from "../tasks.slice";
import { Task, TaskStatus, TaskType } from "../types";

export const dummyTasks: TasksState = {
    tasks:[
        {
            id: "1",
            title: "Task 1",
            type: TaskType.Memorization,
            status: TaskStatus.Assigned,
            ayahs: {
                from: "البقرة (1)",
                to: "البقرة (34)",
            },
            teacherId: "Adam Ali",
            studentId: "Mohamed Ahmed",
            classId: "24",
            assignedOn: "13/May/2023",
            dueDate: "20/May/2023",

        },
            {
            id: "2",
            title: "Task 2",
            type: TaskType.Revision,
            status: TaskStatus.Completed,
            ayahs: {
                from: "البقرة (31)",
                to: "البقرة (44)",
            },
            teacherId: "Adam Ali",
            studentId: "Mohamed Ahmed",
            classId: "24",
            assignedOn: "20/May/2023",
            dueDate: "29/May/2023",

        }
    ]
}
