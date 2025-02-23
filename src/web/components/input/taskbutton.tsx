import React, { FC, useState } from "react";
import { clazz } from "../layout/utils";

export const TaskButton: FC<{
    className?: string
    disabled?: boolean
    task: () => Promise<void>
}> = (props) => {
    const [loading, setLoading] = useState(false);
    const [hideLoading, setHideLoading] = useState(true);

    const handleClick = async () => {
        if (props.disabled || loading) return;
        
        const longTimer = setTimeout(() => setHideLoading(false), 300);

        setLoading(true);
        await props.task();
        setLoading(false);

        clearTimeout(longTimer);
        setHideLoading(true);
    };

    return (
        <button className={clazz("button", (props.disabled || loading) && "loading", hideLoading && "hide-load", props.className)}
            disabled={props.disabled || loading}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
};
