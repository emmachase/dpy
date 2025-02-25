import React, { FC, useState } from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { NavBar } from "../components/app/navbar";
import { UploadBox } from "../components/img/uploadbox";
import { PageAccent } from "../components/img/pageaccent";
import { TextField } from "../components/input/text";
import { TaskButton } from "../components/input/taskbutton";
import { uploadImage } from "../services/upload";

const FormEntry: FC<{
    label: string
    name: string
    optional?: boolean
    placeholder?: string
    area?: boolean
    value?: string
    onChange?: (value: string) => void
}> = (props) => {
    return (
        <div className="mt-8 first:mt-0 w-full">
            <div className="flex mb-2 items-baseline">
                <span className="text-2xl opacity-65">{props.label}</span>
                <div className="flex-1"/>
                {props.optional &&
                    <span className="text-xs opacity-45">optional</span>}
            </div>
            <TextField 
                placeholder={props.placeholder} 
                multiline={props.area}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

const pageRoot: PageRootComponent = () => {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    return (<>
        <NavBar activePage="UPLOAD"/>
        <div className="m-auto w-full max-w-[1000px] pt-8">
            <div className="flex justify-center flex-col md:flex-row">
                <div className="flex flex-col" style={{alignItems: "center"}}>
                    <UploadBox onFileSelected={setFile}/>
                </div>
                <div className="p-6 md:mx-8 md:max-w-[500px] flex justify-center">
                    <div className="flex flex-col">
                        <FormEntry
                            name="name"
                            label="Filename"
                            placeholder="shapes.png"
                            optional={true}
                            value={name}
                            onChange={setName}
                        />

                        <FormEntry
                            name="description"
                            label="Description"
                            placeholder="This image is epic and has cool elements."
                            optional={true}
                            area
                            value={description}
                            onChange={setDescription}
                        />

                        <FormEntry
                            name="tags"
                            label="Tags"
                            placeholder="tetris, pretty, epic"
                            optional={true}
                            value={tags}
                            onChange={setTags}
                        />

                        <aside className="text-sm opacity-60 my-4">
                            The description and tags are purely used for searching / indexing purposes at the moment.
                        </aside>

                        <div className="flex my-6 w-full">
                            <div className="flex-1"/>
                            <TaskButton task={async () => {
                                if (!file) {
                                    throw new Error("Please select a file first");
                                }
                                
                                const response = await uploadImage({
                                    file,
                                    name: name || undefined,
                                    description: description || undefined,
                                    tags: tags || undefined
                                });

                                if (!response) {
                                    throw new Error("Upload failed");
                                }

                                window.location.href = response.url;
                            }}>Upload</TaskButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PageAccent/>
    </>);
};

export default as<PageMeta>({
    needsAuth: true,
    fileName: "upload",
    pageTitle: (ctx) => ctx.title + " - Upload",
    root: pageRoot
});
