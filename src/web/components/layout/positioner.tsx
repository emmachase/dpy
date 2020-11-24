import React, { FC } from "react";

export const PositionerLayer: FC<any> = ({children, ...childProps}) => {
    return (<div style={{
        position: "absolute",
        left: 0, top: 0, right: 0, bottom: 0,
        pointerEvents: "none"
    }} {...childProps}>
        {children}
    </div>);
};
