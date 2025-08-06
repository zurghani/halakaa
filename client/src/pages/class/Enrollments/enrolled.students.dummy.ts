import { Enrollment } from "../types";


export const enrollmentsDummy: Enrollment[] = [
  {
    id: 1,
    classId: 101,
    studentId: 1001,
    studentName: "Alice Johnson",
    createdAt: new Date("2025-08-01T09:00:00Z"),
  },
  {
    id: 2,
    classId: 101,
    studentId: 1002,
    studentName: "Bob Smith",
    createdAt: new Date("2025-08-01T09:05:00Z"),
  },
  {
    id: 3,
    classId: 102,
    studentId: 1003,
    studentName: "Clara Nguyen",
    createdAt: new Date("2025-08-02T11:15:00Z"),
  },
  {
    id: 4,
    classId: 102,
    studentId: 1004,
    studentName: "Daniel Kim",
    createdAt: new Date("2025-08-02T11:17:00Z"),
  },
  {
    id: 5,
    classId: 103,
    studentId: 1005,
    studentName: "Eva Martinez",
    createdAt: new Date("2025-08-03T14:30:00Z"),
  },
];
