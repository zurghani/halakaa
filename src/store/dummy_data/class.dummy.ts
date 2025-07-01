import { Classes } from "../types";

export const dummyClasses: Classes[] = [
  {
    id: "10001",
    teacherId: "20001",
    description: "Morning math class.",
    time: {
      start: "9:00 AM",
      end: "11:00 AM",
    },
    ageGroup: "7 - 9",
    students: [
      { id: "10", name: "Sara" },
      { id: "11", name: "Omar" },
      { id: "12", name: "Fatima" },
      { id: "13", name: "Zayd" },
      { id: "14", name: "Lina" },
      { id: "15", name: "Bilal" },
      { id: "16", name: "Maryam" },
    ],
  },
  {
    id: "10002",
    teacherId: "20002",
    description: "Creative arts and crafts.",
    time: {
      start: "1:00 PM",
      end: "2:30 PM",
    },
    ageGroup: "5 - 8",
    students: [
      { id: "12", name: "Fatima" },
      { id: "13", name: "Zayd" },
      { id: "14", name: "Lina" },
    ],
  },
  {
    id: "10003",
    teacherId: "20003",
    description: "Science and discovery workshop.",
    time: {
      start: "2:00 PM",
      end: "4:00 PM",
    },
    ageGroup: "8 - 12",
    students: [
      { id: "15", name: "Bilal" },
      { id: "16", name: "Maryam" },
    ],
  },
  {
    id: "10004",
    teacherId: "20004",
    description: "Beginner coding bootcamp.",
    time: {
      start: "4:00 PM",
      end: "5:30 PM",
    },
    ageGroup: "10 - 14",
    students: [
      { id: "17", name: "Hamza" },
      { id: "18", name: "Aisha" },
      { id: "19", name: "Yusuf" },
    ],
  },
  {
    id: "10005",
    teacherId: "20005",
    description: "Evening Quran memorization.",
    time: {
      start: "6:00 PM",
      end: "8:00 PM",
    },
    ageGroup: "6 - 10",
    students: [
      { id: "20", name: "Iman" },
      { id: "21", name: "Khalid" },
    ],
  },
];
