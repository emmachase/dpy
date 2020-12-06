import React from "react";

/**
 * Combine class names into a string that can be used in `className`
 * @param classes A list of class names
 */
export function clazz(...classes: (string | boolean | string[] | undefined)[]): string {
    return Array.from(new Set(classes.flat().filter(x => x))).join(" ");
}

/**
 * Computes the client position of an element without considering transformations
 */
export function computePlainPosition(el: HTMLElement): {x: number, y: number} {
    let offsetLeft = 0;
    let offsetTop  = 0;

    do {
        offsetLeft += el.offsetLeft;
        offsetTop  += el.offsetTop;

        el = el.offsetParent as HTMLElement;
    } while( el );

    return {
        x: offsetLeft,
        y: offsetTop
    };
}

/**
 * React Hook which hooks onto a CSS media query.
 * @param queryInput Any valid CSS media query (e.g. "(max-width: 600px)")
 * @param options The important option is `defaultMatches`, use this to specify correct
 * behavior for the initial Server-Side rendering.
 */
export function useMediaQuery(
    queryInput: string | (() => string),
    options: {
        defaultMatches?: boolean
        matchMedia?: (query: string) => MediaQueryList
        ssrMatchMedia?: (query: string) => MediaQueryList
        noSsr?: boolean
    }={}
): boolean {
    let query = typeof queryInput === "function" ? queryInput() : queryInput;
    query = query.replace(/^@media( ?)/m, "");

    const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";


    const {
        defaultMatches = false,
        matchMedia = supportMatchMedia ? window.matchMedia : null,
        ssrMatchMedia = null,
    } = options;

    const [match, setMatch] = React.useState(() => {
        if (ssrMatchMedia) {
            return ssrMatchMedia(query).matches;
        }

        // Once the component is mounted, we rely on the
        // event listeners to return the correct matches value.
        return defaultMatches;
    });

    React.useEffect(() => {
        let active = true;

        if (!supportMatchMedia) return;

        const queryList = matchMedia!(query);
        const updateMatch = () => {
            // Workaround Safari wrong implementation of matchMedia
            // https://github.com/mui-org/material-ui/pull/17315#issuecomment-528286677
            if (active) {
                setMatch(queryList.matches);
            }
        };
        updateMatch();
        queryList.addEventListener("change", updateMatch);
        return () => {
            active = false;
            queryList.removeEventListener("change", updateMatch);
        };
    }, [query, matchMedia]);

    return match;
}
