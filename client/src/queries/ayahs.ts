import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export function useAyahs(filters?: { surahId?: number; number?: number; like?: string }) {
    return useQuery({
        queryKey: ["ayahs", filters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (filters?.surahId) searchParams.append("surah_id", filters.surahId.toString());
            if (filters?.number) searchParams.append("number", filters.number.toString());
            if (filters?.like) searchParams.append("like", filters.like);

            const res = await apiClient.ayahs.$get({
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

export function useAyah(ayahId: string) {
    return useQuery({
        queryKey: ["ayahs", ayahId],
        queryFn: async () => {
            const res = await apiClient.ayahs[":id"].$get({ param: { id: ayahId } });
            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!ayahId,
    });
}
