import { StudentState } from "../student.slice";

export const dummyStudent: StudentState = {
    name: "John Doe",
    id: "54372",
    gender: "Male",
    age: 15,
    parent: "Jane Doe",
    joinDate: "2023-09-01",
    stats: {
        attendance: 95,
        successRate: 85,
        quranCompletion: 70,
    },
};
