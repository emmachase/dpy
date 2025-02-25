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

    const baseClasses = "block bg-primary text-alt text-lg leading-10 rounded-lg px-8 min-w-[200px] text-center cursor-pointer font-bold uppercase transition-colors duration-200 hover:bg-primary/90 active:bg-primary/80";
    const disabledClasses = "bg-disabled text-disabled/70 cursor-default animate-button-loading";
    
    return (
        <button 
            className={clazz(
                baseClasses,
                (props.disabled || loading) && !hideLoading ? disabledClasses : "",
                props.className
            )}
            disabled={props.disabled || loading}
            onClick={handleClick}
        >
            {props.children}
        </button>
    );
};
