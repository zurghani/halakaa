import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewAttendance, UpdateAttendance } from "../types";

export function useAttendances(filters: { classId?: number; studentId?: string; date?: string }) {
    return useQuery({
        queryKey: ["attendances", filters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (filters.classId) searchParams.append("class_id", filters.classId.toString());
            if (filters.studentId) searchParams.append("student_id", filters.studentId.toString());
            if (filters.date) searchParams.append("date", filters.date);

            const res = await apiClient.attendances.$get({
                query: Object.fromEntries(searchParams.entries()),
            });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!(filters.classId || filters.studentId || filters.date),
    });
}

export function useUpdateAttendance() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            attendanceId,
            updateAttendance,
        }: {
            attendanceId: number;
            updateAttendance: UpdateAttendance;
        }) => {
            const res = await apiClient.attendances[":id"].$put({
                param: { id: attendanceId.toString() },
                json: updateAttendance,
            });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attendances"] });
        },
    });
}

export function useCreateAttendance() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newAttendance: NewAttendance) => {
            const res = await apiClient.attendances.$post({ json: newAttendance });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attendances"] });
        },
    });
}

export function useDeleteAttendance() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (attendanceId: string) => {
            const res = await apiClient.attendances[":id"].$delete({ param: { id: attendanceId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["attendances"] });
        },
    });
}
