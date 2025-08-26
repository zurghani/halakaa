// src/queries/todos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewStudent } from "../types";

export function useStudents() {
    return useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const res = await apiClient["students"].$get();
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
    });
}
export function useStudent(studentId: string) {
    return useQuery({
        queryKey: ["students", studentId],
        queryFn: async () => {
            const res = await apiClient["students"][":id"].$get({ param: { id: studentId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!studentId,
    });
}
export function useCreateStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newStudent: NewStudent) => {
            const res = await apiClient["students"].$post({ json: newStudent });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });
}
