import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewTaskType } from "../types";

export function useTaskTypes() {
    return useQuery({
        queryKey: ["taskTypes"],
        queryFn: async () => {
            const res = await apiClient["task-types"].$get();
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
    });
}

export function useTaskType(taskTypeId: string) {
    return useQuery({
        queryKey: ["taskTypes", taskTypeId],
        queryFn: async () => {
            const res = await apiClient["task-types"][":id"].$get({ param: { id: taskTypeId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!taskTypeId,
    });
}

export function useCreateTaskType() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newTaskType: NewTaskType) => {
            const res = await apiClient["task-types"].$post({ json: newTaskType });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskTypes"] });
        },
    });
}

export function useDeleteTaskType() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (taskTypeId: string) => {
            const res = await apiClient["task-types"][":id"].$delete({ param: { id: taskTypeId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskTypes"] });
        },
    });
}