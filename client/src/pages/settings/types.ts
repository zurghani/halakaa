
export type TaskType = {
    name: string;
    id: number;
    description?: string | null | undefined;
    createdAt?: Date | null | undefined;
}

export type AgeGroup = {
    from: number;
    to: number;
    id: number;
    description?: string | null | undefined;
    createdAt?: Date | null | undefined;
}