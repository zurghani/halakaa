
export type UserSearchOptionsType = {
    name: { value: "name"; label: string };
    email: { value: "email"; label: string };
    phone: { value: "phone"; label: string };
};

export const UserSearchOptions: UserSearchOptionsType = {
    name: { value: "name", label: "Name" },
    email: { value: "email", label: "Email" },
    phone: { value: "phone", label: "Phone" },
};
