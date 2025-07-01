import { AttendanceStatus, Student } from "../types";

export const dummyStudent: Student = {
  id: "54372",
  name: "John Doe",
  gender: "Male",
  age:12,
  attendance:[
    {
      teacherId: "33493",
      date: "6/14/2025",
      status: AttendanceStatus.Present
    },
    {
      teacherId: "33493",
      date: "6/15/2025",
      status: AttendanceStatus.Present
    },
    {
      teacherId: "33493",
      date: "6/16/2025",
      status: AttendanceStatus.Absent
    },
    {
      teacherId: "33445",
      date: "6/17/2025",
      status: AttendanceStatus.Present
    },
    {
      teacherId: "46236",
      date: "6/18/2025",
      status: AttendanceStatus.Late
    },
  ]
};
