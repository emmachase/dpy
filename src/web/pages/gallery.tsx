import React, { useEffect, useState } from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { TextField } from "../components/input/text";
import { Flex } from "../components/layout/flex";
import { useMediaQuery } from "../components/layout/utils";
import { NavBar } from "../components/app/navbar";
import { Grid } from "../components/layout/grid";
import { Card, CardContentType } from "../components/app/card";
import { callAPI } from "../services/api";
import { fetchImages, ImageModel } from "../services/list";
import InfiniteScroll from "react-infinite-scroll-component";
import { useIsScrollable } from "../util/isScrollable";

const pageRoot: PageRootComponent = ({appParams}) => {
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ImageModel[]>([]);

    const fetchData = async () => {
        setLoading(true);
        const newImages = await fetchImages(+images[images.length - 1]?.id);
        if (newImages.length === 0) setDone(true);
        setImages(images.concat(newImages));
        setLoading(false);
    };

    const scrollable = typeof window === "object" ? useIsScrollable([images]) : true;
    useEffect(() => {
        if (loading) return;

        if (!scrollable && !done) {
            void fetchData();
        }
    }, [loading, scrollable, done]);

    return (<>
        <NavBar activePage="GALLERY"/>
        <div className="content-wrapper">
            <InfiniteScroll className="grid"
                dataLength={images.length}
                next={fetchData}
                hasMore={!done}
                loader={new Array(20).fill(0).map((_, idx) =>
                    <Card key={idx}/>)}>

                {images.map((v, idx) =>
                    <Card
                        key={v.name ?? idx}
                        url={v.name}
                        type={v.mime.startsWith("video")
                            ? CardContentType.VIDEO
                            : CardContentType.IMAGE}/>
                    // <div key={v.name}>{v.name}</div>
                )}

            </InfiniteScroll>
        </div>
    </>);
};

export default as<PageMeta>({
    needsAuth: true,
    fileName: "gallery",
    pageTitle: (ctx) => ctx.title + " - Gallery",
    root: pageRoot
});

