import React, { useEffect, useState, useCallback } from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { NavBar } from "../components/app/navbar";
import { Card, CardContentType } from "../components/app/card";
import { fetchImages, ImageModel } from "../services/list";
import { AutoSizer, Grid, InfiniteLoader, Size } from 'react-virtualized';
//import 'react-virtualized/styles.css'; // Add virtualized styles

const CARD_WIDTH = 200;
const CARD_HEIGHT = 200;
const LOAD_BATCH_SIZE = 50;
// Very large number to simulate infinite scrolling
const VIRTUAL_LIST_SIZE = 1000000;

const pageRoot: PageRootComponent = ({appParams}) => {
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ImageModel[]>([]);

    const [maxIndex, setMaxIndex] = useState(0);

    // Add initial data loading
    useEffect(() => {
        if (images.length === 0 && !loading) {
            void fetchData(0, LOAD_BATCH_SIZE);
        }
    }, []);

    const fetchData = async (startIndex: number, stopIndex: number) => {
        console.log("fetchData", startIndex, stopIndex);

        if (stopIndex > maxIndex) {
            setMaxIndex(stopIndex);
        }

        if (loading || done) return;
        setLoading(true);
        const lastId = startIndex > 0 ? +images[startIndex - 1]?.id : 0;
        const newImages = await fetchImages(lastId);
        if (newImages.length === 0) setDone(true);

        while (stopIndex - startIndex > newImages.length) {
            // Fake for now, just duplicate until we have enough
            newImages.push(...newImages);
        }
        console.log("newImages", newImages.length);

        setImages(prev => [...prev, ...newImages]);
        setLoading(false);
    };

    const isRowLoaded = ({ index }: { index: number }) => {
        return Boolean(images[index]);
    };

    const cellRenderer = ({ columnIndex, key, rowIndex, style }: any) => {
        const numColumns = getNumColumns(style.width);
        const idx = rowIndex * numColumns + columnIndex;
        
        // Show skeleton card if we're beyond loaded images
        if (idx >= images.length) {
            return (
                <div key={key} style={{
                    ...style,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Card />
                </div>
            );
        }

        const image = images[idx];
        return (
            <div key={key} style={{
                ...style,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Card
                    key={image.name ?? idx}
                    url={image.name}
                    type={image.mime.startsWith("video")
                        ? CardContentType.VIDEO
                        : CardContentType.IMAGE}
                />
            </div>
        );
    };

    const getNumColumns = (width: number) => Math.max(1, Math.floor(width / CARD_WIDTH));

    const getColumnWidth = (width: number, numColumns: number) => {
        return width / numColumns;
    };

    const getNumRows = (width: number) => {
        const numColumns = getNumColumns(width);
        // Calculate actual rows needed for current data plus one batch
        return Math.ceil((maxIndex + LOAD_BATCH_SIZE) / numColumns);
    };

    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <NavBar activePage="GALLERY"/>
        <div className="content-wrapper" style={{ flex: 1, width: '100%' }}>
            <AutoSizer>
                {({ width, height }: Size) => {
                    const numColumns = getNumColumns(width);
                    const columnWidth = getColumnWidth(width, numColumns);
                    const numRows = getNumRows(width);
                    
                    return (
                        <InfiniteLoader
                            isRowLoaded={isRowLoaded}
                            loadMoreRows={({startIndex, stopIndex}) => fetchData(startIndex, stopIndex)}
                            rowCount={VIRTUAL_LIST_SIZE}
                            minimumBatchSize={LOAD_BATCH_SIZE}
                            threshold={10}
                        >
                            {({ onRowsRendered, registerChild }) => (
                                <Grid
                                    ref={registerChild}
                                    cellRenderer={cellRenderer}
                                    columnCount={numColumns}
                                    columnWidth={columnWidth}
                                    height={height}
                                    rowCount={numRows}
                                    rowHeight={CARD_HEIGHT}
                                    width={width}
                                    onSectionRendered={({ rowStartIndex, rowStopIndex, columnStartIndex, columnStopIndex }) => {
                                        onRowsRendered({
                                            startIndex: rowStartIndex * numColumns + columnStartIndex,
                                            stopIndex: rowStopIndex * numColumns + columnStopIndex
                                        });
                                    }}
                                />
                            )}
                        </InfiniteLoader>
                    );
                }}
            </AutoSizer>
        </div>
    </div>);
};

export default as<PageMeta>({
    needsAuth: true,
    fileName: "gallery",
    pageTitle: (ctx) => ctx.title + " - Gallery",
    root: pageRoot
});

