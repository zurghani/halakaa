export type SearchOptionsType = {
    id: { value: "id"; label: string };
    name: { value: "name"; label: string };
    dob: { value: "dob"; label: string };
};

export const SearchOptions: SearchOptionsType = {
    id: { value: "id", label: "ID" },
    name: { value: "name", label: "Name" },
    dob: { value: "dob", label: "Date of Birth" },
};
