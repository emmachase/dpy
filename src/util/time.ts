export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;
export const WEEKS = 7 * DAYS;

export function timeFromNow(delta: number): Date {
    const now = +new Date();
    return new Date(now + delta);
}

export function formatDatetime(date: Date): string {
    const g = (field: number, len=2) => {
        return field.toString().padStart(len, "0");
    };

    const fst = `${g(date.getUTCFullYear(), 4)}-${g(date.getUTCMonth()+1)}-${g(date.getUTCDate())}`;
    const snd = `${g(date.getUTCHours())}:${g(date.getUTCMinutes())}:${g(date.getUTCSeconds())}`;
    return fst + " " + snd;
}
