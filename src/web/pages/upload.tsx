import React, { FC, useState } from "react";
import { as } from "../../util/poly";
import { PageMeta, PageRootComponent } from "../template";
import { NavBar } from "../components/app/navbar";
import { UploadBox } from "../components/img/uploadbox";
import { PageAccent } from "../components/img/pageaccent";
import { Flex } from "../components/layout/flex";
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
        <div className="form-entry">
            <Flex className="heading">
                <span className="label">{props.label}</span>
                <Flex.Child/>
                {props.optional &&
                    <span className="optional">optional</span>}
            </Flex>
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
        <div className="content-wrapper">
            <Flex justifyContent="center" className="twobreak">
                <Flex.Child nest direction="column" style={{alignItems: "center"}}>
                    <UploadBox onFileSelected={setFile}/>
                </Flex.Child>
                <Flex.Child className="form-bar" nest style={{justifyContent: "center"}}>
                    <Flex direction="column">
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

                        <aside>
                            The description and tags are purely used for searching / indexing purposes at the moment.
                        </aside>

                        <Flex className="submit">
                            <Flex.Child/>
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
                        </Flex>
                    </Flex>
                </Flex.Child>
            </Flex>
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
