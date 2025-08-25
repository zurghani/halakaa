import { hcWithType } from "server/dist/client";

export const apiClient = hcWithType("http://localhost:4000", {
    init: {
        credentials: "include",
    },
});

// const d = await apiClient["age-groups"].$post();
// const c = await apiClient["students"].$get();

// const data = await c.json();

// console.log(data);
// try {
//     const response = await apiClient["age-groups"].$post();
//     if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
//     const data = await response.json();
//     console.log(data.id);
// } catch (error) {
//     console.error("API call failed:", error);
// }
// if (data[0]) {

// }
