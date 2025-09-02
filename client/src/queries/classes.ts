import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewClass, UpdateClass } from "../types";

export function useClasses(filters?: {
    teacherId?: string;
    teacherName?: string;
    classId?: number;
}) {
    return useQuery({
        queryKey: ["classes", filters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (filters?.teacherId) searchParams.append("teacher_id", filters.teacherId);
            if (filters?.teacherName) searchParams.append("teacher_name", filters.teacherName);
            if (filters?.classId) searchParams.append("class_id", filters.classId.toString());

            const res = await apiClient.classes.$get({
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

export function useClass(classId: string) {
    return useQuery({
        queryKey: ["classes", classId],
        queryFn: async () => {
            const res = await apiClient.classes[":id"].$get({ param: { id: classId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!classId,
    });
}

export function useCreateClass() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newClass: NewClass) => {
            const res = await apiClient.classes.$post({ json: newClass });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
        },
    });
}

export function useUpdateClass() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ classId, updates }: { classId: string; updates: UpdateClass }) => {
            const res = await apiClient.classes[":id"].$put({
                param: { id: classId },
                json: updates,
            });
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
        },
    });
}

export function useDeleteClass() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (classId: string) => {
            const res = await apiClient.classes[":id"].$delete({ param: { id: classId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
        },
    });
}
