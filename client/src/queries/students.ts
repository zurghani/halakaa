// src/queries/todos.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export function useStudents() {
    return useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const res = await apiClient["students"].$get();
            if (!res.ok) throw new Error(await res.text());
            return await res.json();
        },
    });
}
