import React, { CSSProperties, FC } from "react";

export const Flex: FC<{
    direction?: "row" | "column"
    justifyContent?: "start" | "center" | "end"
    alignItems?: "start" | "center" | "end"
    className?: string
}> & {
    Child: FC<{
        flex?: number
        className?: string
        style?: CSSProperties
        nest?: boolean
        direction?: "row" | "column"
    }>
} = (props) => (
    <div className={props.className} style={{
        display: "flex",
        flexDirection: props.direction,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems
    }}>
        {props.children}
    </div>
);

Flex.Child = function Child(props) {
    return <div style={Object.assign({
        flex: props.flex ?? 1,
        flexDirection: props.direction,
        display: props.nest ? "flex" : undefined
    }, props.style)} className={props.className}>
        {props.children}
    </div>;
};
