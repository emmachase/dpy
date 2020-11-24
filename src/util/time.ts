export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;
export const WEEKS = 7 * DAYS;

export function timeFromNow(delta: number): Date {
    const now = +new Date();
    return new Date(now + delta);
}
