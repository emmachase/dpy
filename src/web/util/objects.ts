/**
 * Clones and returns `obj` but without any of `props`
 * @param obj The object to remove properties from
 * @param props A list of the properties that should be removed
 */
export function withoutProps<
    Target extends Record<string, unknown>,
    Props extends Extract<keyof Target, string>
> (obj: Target, ...props: Props[]): Omit<Target, Props> {
    const result: Partial<Target> = {};
    for (const key in obj) {
        if (!props.includes(key as Props)) {
            result[key] = obj[key] as any;
        }
    }

    return result as Target;
}
