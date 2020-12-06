export function implies<A, B>(a: A | undefined | null, b: (x: A) => B): B | undefined {
    if (a) return b(a);
}
