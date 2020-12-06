import React from "react";
import { clazz } from "../layout/utils";

export const Skeleton: React.FC<{
    count?: number
    duration?: number
    width?: number | null
    wrapper?: React.FC | null
    height?: number | null
    circle?: boolean
    style?: React.CSSProperties
    className?: string
    fading?: boolean
}> = ({
    count = 1,
    duration = 1.2,
    width = null,
    wrapper: Wrapper,
    height = null,
    circle = false,
    style: customStyle,
    className: customClassName,
    fading = false
}) => {
    const elements = [];

    for (let i = 0; i < count; i++) {
        const style: React.CSSProperties = {};

        if (width !== null) {
            style.width = width;
        }

        if (height !== null) {
            style.height = height;
        }

        if (width !== null && height !== null && circle) {
            style.borderRadius = "50%";
        }

        let className = "react-loading-skeleton";
        if (customClassName) {
            className += " " + customClassName;
        }

        elements.push(
            <span
                key={i}
                className={clazz("loading-skeleton", className)}
                style={{
                    animation: `skeleton-keyframes ${duration}s ease-in-out infinite`,
                    opacity: fading ? 0 : 1,
                    ...customStyle,
                    ...style,
                }}
            >
                &zwnj;
            </span>
        );
    }

    return (
        <span>
            {Wrapper
                ? elements.map((element, i) => (
                    <Wrapper key={i}>
                        {element}
                &zwnj;
                    </Wrapper>
                ))
                : elements}
        </span>
    );
};
