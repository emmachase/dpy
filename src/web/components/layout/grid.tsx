import React, { FC } from "react";

export const Grid: FC<{
    className?: string
}> = (props) => {
    return (
        <div className={`grid grid-cols-[repeat(auto-fit,160px)] gap-8 py-10 justify-evenly overflow-visible ${props.className || ''}`}>
            {props.children}
        </div>
    );
};
