import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // tweak to taste:
            staleTime: 30_000, // 30s data is “fresh”
            retry: 2, // retry failed queries twice
            refetchOnWindowFocus: false, // disable focus refetch
        },
    },
});
