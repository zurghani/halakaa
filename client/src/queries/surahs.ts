import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export function useSurahs(filters?: { like?: string }) {
    return useQuery({
        queryKey: ["surahs", filters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (filters?.like) searchParams.append("like", filters.like);

            const res = await apiClient.surahs.$get({
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

export function useSurah(surahId: string) {
    return useQuery({
        queryKey: ["surahs", surahId],
        queryFn: async () => {
            const res = await apiClient.surahs[":id"].$get({ param: { id: surahId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!surahId,
    });
}
