import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const Card: FC<{

}> = (props) => {
    return (
        <div className="im-card">
            {props.children || <Skeleton/>}
        </div>
    );
};
