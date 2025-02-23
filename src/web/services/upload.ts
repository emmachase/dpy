import { callAPI } from "./api";

export interface UploadRequest {
    file: File;
    name?: string;
    description?: string;
    tags?: string;
}

export type UploadResponse = {
    url: string;
    del: string;
}

const UPLOAD_ENDPOINT = "/upload";

export async function uploadImage(request: UploadRequest): Promise<UploadResponse | undefined> {
    try {
        const formData = new FormData();
        formData.append('file', request.file);
        
        if (request.name) {
            formData.append('name', request.name);
        }
        if (request.description) {
            formData.append('description', request.description);
        }
        if (request.tags) {
            formData.append('tags', request.tags);
        }

        const resp = await callAPI({
            endpoint: UPLOAD_ENDPOINT,
            method: "POST",
            body: formData
        }).then(resp => resp.json());

        if (resp.ok) {
            return resp;
        } else {
            console.error('Upload failed:', resp);
            return undefined;
        }
    } catch (e) {
        console.error('Upload failed:', e);
        return undefined;
    }
}
