export type FindClassResultType = {
    key: string;
    id: string;
    teacher: string;
    ageGroup: string;
    StartsAt: string;
    EndsAt: string;
};
export const FindClassResultDummyData: FindClassResultType[] = [
    {
        key: "1",
        id: "001",
        teacher: "Ali Ahmed",
        ageGroup: "5 - 7",
        StartsAt: "10:00 AM",
        EndsAt: "11:00 AM",
    },
    {
        key: "2",
        id: "002",
        teacher: "Sara Khalid",
        ageGroup: "8 - 10",
        StartsAt: "11:00 AM",
        EndsAt: "12:00 PM",
    },
    {
        key: "3",
        id: "003",
        teacher: "Omar Youssef",
        ageGroup: "11 - 13",
        StartsAt: "12:00 PM",
        EndsAt: "1:00 PM",
    },
];
