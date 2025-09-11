export type SearchOptionsType = {
    id: { value: "id"; label: string };
    teacher: { value: "teacher"; label: string };
    all: { value: "all"; label: string };
};

export const SearchOptions: SearchOptionsType = {
    id: { value: "id", label: "Class ID" },
    teacher: { value: "teacher", label: "Teacher" },
    all: { value: "all", label: "View All" },
};
