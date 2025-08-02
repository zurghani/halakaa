export type FindUserResultType = {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
};

export const FindUserResultDummyData: FindUserResultType[] = [
  {
    key: "1",
    id: "U001",
    name: "Amina Al-Farsi",
    email: "amina@example.com",
    role: "admin",
    phone: "123-456-7890"
  },
  {
    key: "2",
    id: "U002",
    name: "Bilal Hussein",
    email: "bilal@example.com",
    role: "teacher",
    phone: "987-654-3210"
  },
  {
    key: "3",
    id: "U003",
    name: "Layla Mansour",
    email: "layla@example.com",
    role: "parent",
    phone: "555-123-4567"
  },
  {
    key: "4",
    id: "U004",
    name: "Yousef Nader",
    email: "yousef@example.com",
    role: "student",
    phone: "444-987-6543"
  },
];