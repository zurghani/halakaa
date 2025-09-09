import { hcWithType } from "server/dist/client";

export const apiClient = hcWithType("http://localhost:4000", {
    init: {
        credentials: "include",
    },
});
