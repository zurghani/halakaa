export type FindStudentResultType = {
    key: string;
    id: string;
    name: string;
    ageGroup: string;
}[]
export const FindStudentResultDummyData: FindStudentResultType = [
    {
        key: "1",
        id: "001",
        name: "Ali Ahmed",
        ageGroup: "5-10",
    },
    {
        key: "2",
        id: "002",
        name: "Sara Khalid",
        ageGroup: "11-15",
    },
    {
        key: "3",
        id: "003",
        name: "Omar Youssef",
        ageGroup: "5-10",
    },
];