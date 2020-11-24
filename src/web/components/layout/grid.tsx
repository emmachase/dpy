import React, { FC } from "react";

export const Grid: FC<{

}> = (props) => {
    return (
        <div className="grid">
            {props.children}
        </div>
    );
};
