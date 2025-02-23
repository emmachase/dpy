import { callAPI } from "./api";

export interface ImageModel {
    id: number
    name: string
    mime: string
    created: Date
    tags: string[]
}

const IMAGES_ENDPOINT = "/list";
export async function fetchImages(before?: number, limit?: number): Promise<ImageModel[]> {
    try {
        const resp = await callAPI({
            endpoint: IMAGES_ENDPOINT,
            queries: { before: before?.toString() ?? "null", gallery: "1", limit: limit?.toString() ?? "100" },
            method: "GET",
        });

        const images: ImageModel[] = await resp.json();

        // Reformat the times into Date's
        images.forEach(im => im.created = new Date(im.created));
        return images;
    } catch (e) {
        console.log(e);
    }

    return [];
}
