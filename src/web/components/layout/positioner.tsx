import React, { FC } from "react";

export const PositionerLayer: FC<any> = ({children, ...childProps}) => {
    return (<div 
        className="absolute inset-0 pointer-events-none" 
        {...childProps}
    >
        {children}
    </div>);
};
