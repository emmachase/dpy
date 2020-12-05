export function promisifyUnary<R>(fn: (cb: ((ret: R) => unknown)) => unknown): Promise<R> {
    return new Promise(resolve => fn(resolve));
}
