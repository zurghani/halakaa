import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewEnrollment } from "../types";

export function useEnrollments(filters: { classId?: number; studentId?: number }) {
    return useQuery({
        queryKey: ["enrollments", filters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (filters.classId) searchParams.append("class_id", filters.classId.toString());
            if (filters.studentId) searchParams.append("student_id", filters.studentId.toString());

            const res = await apiClient.enrollments.$get({
                query: Object.fromEntries(searchParams.entries()),
            });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!(filters.classId || filters.studentId),
    });
}

export function useCreateEnrollment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newEnrollment: NewEnrollment) => {
            const res = await apiClient.enrollments.$post({ json: newEnrollment });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["enrollments"] });
        },
    });
}

export function useDeleteEnrollment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (enrollmentId: string) => {
            const res = await apiClient.enrollments[":id"].$delete({ param: { id: enrollmentId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["enrollments"] });
        },
    });
}
