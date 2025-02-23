import React, { useEffect, useState, useCallback, useRef } from "react";
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

class ImageManager {
    private images: ImageModel[] = [];
    // private loading = false;
    private done = false;
    private currentPromise: Promise<ImageModel[]> = Promise.resolve([]);
    private maxRequestedIndex = 0;

    async fetchData(startIndex: number, stopIndex: number): Promise<ImageModel[]> {
        console.log("fetchData", startIndex, stopIndex);
        
        // Update max requested index if this request goes further
        this.maxRequestedIndex = Math.max(this.maxRequestedIndex, stopIndex);

        // Wait for any ongoing fetch to complete
        await this.currentPromise;

        // If we're done or have enough images, return immediately
        if (this.done && stopIndex < this.images.length) {
            return this.images;
        }

        // Start new fetch chain
        this.currentPromise = new Promise(async (resolve) => {
            // Keep fetching until we either reach the requested index or run out of images
            while (!this.done && this.images.length <= stopIndex) {
                const lastId = this.images.length > 0 ? +this.images[this.images.length - 1].id : 0;
                const newImages = await fetchImages(lastId, 100);
                
                if (newImages.length === 0) {
                    this.done = true;
                    break;
                }

                this.images.push(...newImages);

                // Check if any duplicates were added
                const uniqueImages = this.images.filter((image, index, self) =>
                    index === self.findIndex((t) => t.id === image.id)
                );

                if (uniqueImages.length !== this.images.length) {
                    console.warn("duplicates images were returned", this.images.length, uniqueImages.length);
                    this.images = uniqueImages;
                }
            }

            resolve(this.images);
        });

        return this.currentPromise;
    }

    getImages(): ImageModel[] {
        return this.images;
    }

    isDone(): boolean {
        return this.done;
    }

    getMaxRequestedIndex(): number {
        return this.maxRequestedIndex;
    }
}

const imageManager = {
    current: new ImageManager()
};

const pageRoot: PageRootComponent = ({appParams}) => {
    const [images, setImages] = useState<ImageModel[]>([]);

    const fetchData = async (startIndex: number, stopIndex: number) => {
        const newImages = await imageManager.current.fetchData(startIndex, stopIndex);
        setImages([...newImages]);
    };

    const isRowLoaded = ({ index }: { index: number }) => {
        return Boolean(images[index]);
    };

    const cellRenderer = (numColumns: number) => ({ columnIndex, key, rowIndex, style }: any) => {
            const idx = rowIndex * numColumns + columnIndex;

            // Show skeleton card if we're beyond loaded images
            if (idx >= images.length) {
                if (imageManager.current.isDone()) {
                    return null; // No more images to load
                }

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

    const getNumRows = (numColumns: number) => {
        if (imageManager.current.isDone()) return Math.ceil(imageManager.current.getImages().length / numColumns);

        // Calculate actual rows needed for current data plus one batch
        return Math.ceil((imageManager.current.getMaxRequestedIndex() + LOAD_BATCH_SIZE) / numColumns);
    };

    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <NavBar activePage="GALLERY"/>
        <div className="content-wrapper" style={{ flex: 1, width: '100%' }}>
            <AutoSizer>
                {({ width, height }: Size) => {
                    const numColumns = getNumColumns(width);
                    const columnWidth = getColumnWidth(width, numColumns);
                    const numRows = getNumRows(numColumns);
                    
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
                                    cellRenderer={cellRenderer(numColumns)}
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

