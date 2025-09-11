import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { errorHandler } from "./error-handler";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // tweak to taste:
            staleTime: 30_000, // 30s data is "fresh"
            retry: 2, // retry failed queries twice
            refetchOnWindowFocus: false, // disable focus refetch
        },
    },
    queryCache: new QueryCache({
        onError: (error: any) => {
            errorHandler.handleError(error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: any) => {
            errorHandler.handleError(error);
        },
    }),
});
