import { useLayoutEffect, useState } from "react";

export const useIsScrollable = (dependencies: any[]): boolean => {
    const [isScrollable, setIsScrollable] = useState<boolean>(false);

    useLayoutEffect(() => {
        setIsScrollable(document.body.scrollHeight > document.body.clientHeight);
    }, [...dependencies]);

    useLayoutEffect(() => {
        const handleWindowResize = () => {
            setIsScrollable(document.body.scrollHeight > document.body.clientHeight);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return isScrollable;
};
