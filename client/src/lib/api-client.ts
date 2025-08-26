import { hcWithType } from "server/dist/client";

export const apiClient = hcWithType("http://localhost:4000", {
    init: {
        credentials: "include",
    },
});

// const d = await apiClient["age-groups"].$get()

// const data= await d.json()

// if (data[0]) {

// }