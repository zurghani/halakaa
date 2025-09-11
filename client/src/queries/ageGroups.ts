import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { NewAgeGroup } from "../types";

export function useAgeGroups() {
    return useQuery({
        queryKey: ["ageGroups"],
        queryFn: async () => {
            const res = await apiClient["age-groups"].$get();
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
    });
}

export function useAgeGroup(ageGroupId: string) {
    return useQuery({
        queryKey: ["ageGroups", ageGroupId],
        queryFn: async () => {
            const res = await apiClient["age-groups"][":id"].$get({ param: { id: ageGroupId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!ageGroupId,
    });
}

export function useCreateAgeGroup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newAgeGroup: NewAgeGroup) => {
            const res = await apiClient["age-groups"].$post({ json: newAgeGroup });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ageGroups"] });
        },
    });
}

export function useDeleteAgeGroup() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ageGroupId: string) => {
            const res = await apiClient["age-groups"][":id"].$delete({ param: { id: ageGroupId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["ageGroups"] });
        },
    });
}