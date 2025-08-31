import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import { AyahReference } from "../types";

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

export function useAyahsByIds(ayahIds: number[]) {
    return useQuery({
        queryKey: ["ayahs", { ayahIds }],
        queryFn: async () => {
            if (!ayahIds || ayahIds.length === 0) return [];
            const res = await apiClient.ayahs.$get({
                param: { ids: ayahIds.join(",") },
            });

            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!ayahIds && ayahIds.length > 0,
    });
}

export function useAyahReferences(ids: number[]) {
    return useQuery<AyahReference[]>({
        queryKey: ["ayahReferences", ids],
        queryFn: async () => {
            if (!ids || ids.length === 0) return [];

            const res = await apiClient.ayahs.references.$get({
                query: { ids: ids.join(",") },
            });
            console.log("Query IDs", ids);
            console.log("API response", res);

            if (!res.ok) {
                const error = new Error(await res.text());
                (error as any).status = res.status;
                throw error;
            }
            return await res.json();
        },
        enabled: !!ids && ids.length > 0,
    });
}
