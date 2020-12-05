export function validateFilename(name: string): boolean {
    return /^[a-zA-Z0-9._-]+$/.test(name);
}