import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewTask, UpdateTask } from "../types";

export function useTasks(filters?: { studentId?: number }) {
    return useQuery({
        queryKey: ["tasks", filters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (filters?.studentId) searchParams.append("student_id", filters.studentId.toString());

            const res = await apiClient["tasks"].$get({
                query: Object.fromEntries(searchParams.entries()),
            });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
    });
}

export function useTask(taskId: string) {
    return useQuery({
        queryKey: ["tasks", taskId],
        queryFn: async () => {
            const res = await apiClient["tasks"][":id"].$get({ param: { id: taskId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!taskId,
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTask: NewTask) => {
            const res = await apiClient["tasks"].$post({ json: newTask });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
}

export function useUpdateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ taskId, updates }: { taskId: string; updates: UpdateTask }) => {
            const res = await apiClient["tasks"][":id"].$put({
                param: { id: taskId },
                json: updates,
            });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskId: string) => {
            const res = await apiClient["tasks"][":id"].$delete({ param: { id: taskId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
}