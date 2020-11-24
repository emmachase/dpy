import React from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { TextField } from "../components/input/text";
import { Flex } from "../components/layout/flex";
import { useMediaQuery } from "../components/layout/utils";
import { NavBar } from "../components/app/navbar";
import { Grid } from "../components/layout/grid";
import { Card } from "../components/app/card";

const pageRoot: PageRootComponent = ({appParams}) => {
    const images = [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    ];

    return (<>
        <NavBar activePage="GALLERY"/>
        <div className="content-wrapper">
            <Grid>{images.map((v, idx) =>
                <Card key={idx}/>
            )}</Grid>
        </div>
    </>);
};

export default as<PageMeta>({
    needsAuth: true,
    fileName: "gallery",
    pageTitle: (ctx) => ctx.title + " - Gallery",
    root: pageRoot
});
