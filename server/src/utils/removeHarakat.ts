export function removeHarakat(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED\u0670\u08E4-\u08FE]/g, "")
        .replace(/\u200C/g, ""); // also remove zero-width non-joiner if present
}
