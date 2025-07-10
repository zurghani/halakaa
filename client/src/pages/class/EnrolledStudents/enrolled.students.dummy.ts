import { Student } from "../../../store/types";

export interface EnrolledStudentsType extends Student {
    key: React.Key;
}

export const EnrolledStudentsData: EnrolledStudentsType[] = [
    {
        key: "1",
        name: "Mohamed Ali",
        id: "123245",
    },
    {
        key: "2",
        name: "Fatima Zahra",
        id: "543210",
    },
    {
        key: "3",
        name: "Ahmed Mostafa",
        id: "678901",
    },
    {
        key: "4",
        name: "Sara Nabil",
        id: "456789",
    },
    {
        key: "5",
        name: "Mohamed Ali",
        id: "111222",
    },
];