import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { promisifyUnary } from "../../../util/promise";

enum DisplayType {
    WAITING,
    IMAGE,
    FILE
}

const loadingImage = "data:image/svg+xml,%3Csvg width='140' height='20' viewBox='0 0 140 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='10' fill='white'/%3E%3Ccircle cx='50' cy='10' r='10' fill='white'/%3E%3Ccircle cx='130' cy='10' r='10' fill='white'/%3E%3Ccircle cx='90' cy='10' r='10' fill='white'/%3E%3C/svg%3E%0A";

export const UploadBox: FC<{

}> = (props) => {
    const dragCounter = useRef(0), dragTarget = useRef<SVGSVGElement>(null);
    const [fileState, setFileState] = useState(DisplayType.WAITING);
    const [heldFile, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const [dropping, setDropping] = useState(false);

    const processFile = (file?: File) => {
        if (file) {
            setFileState(file.type.startsWith("image") ? DisplayType.IMAGE : DisplayType.FILE);
            setFile(file);
        } else {
            setFileState(DisplayType.WAITING);
            setFile(null);
        }
    };

    const handleClick = () => {
        const input = document.createElement("input");
        input.type = "file";

        input.click();
        input.addEventListener("input", () => {
            processFile(input.files?.[0]);
        });
    };

    const handleDragIn = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        if (e.dataTransfer?.items?.length ?? 0 > 0) {
            setDragging(true);
        }
    };

    const handleDragOut = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;
        if (dragCounter.current > 0) return;
        setDragging(false);
    };

    const handleDragOver = (e: DragEvent) => {
        if (!dragTarget.current) return;
        if (e.composedPath().includes(dragTarget.current)) {
            e.preventDefault(); // Cancel the over event so that drops are possible
            setDropping(true);
        } else {
            setDropping(false);
        }
    };

    const handleDrop = async (e: React.DragEvent<SVGSVGElement>) => {
        if (e.dataTransfer?.items?.length ?? 0 > 0) {
            e.preventDefault(); // Don't open the file in a new page as is default
            setDragging(false);
            setDropping(false);
            setPreview("");

            // Process the dropped item
            const item = e.dataTransfer.items[0];
            const file = item.getAsFile() ?? new File(
                [await promisifyUnary(item.getAsString.bind(item))], "string.txt", {
                    type: item.type,
                }
            );

            processFile(file);
        }
    };

    useEffect(() => {
        document.addEventListener("dragenter", handleDragIn);
        document.addEventListener("dragleave", handleDragOut);
        document.addEventListener("dragover", handleDragOver);

        return () => {
            document.removeEventListener("dragenter", handleDragIn);
            document.removeEventListener("dragleave", handleDragOut);
            document.removeEventListener("dragover", handleDragOver);
        };
    }, []);

    const [preview, setPreview] = useState("");
    useMemo(() => {
        if (heldFile && fileState === DisplayType.IMAGE) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setPreview(reader.result as string));
            reader.readAsDataURL(heldFile);
        } else {
            setPreview("");
        }
    }, [heldFile]);

    // For overwriting drags
    const displayState = dragging 
        ? DisplayType.WAITING 
        : fileState;

    switch (displayState) {
    case DisplayType.WAITING: 
        return <svg onClick={handleClick} onDrop={handleDrop} className="uploadbox waiting" ref={dragTarget} viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="clickable" strokeDasharray={dragging ? 16 : undefined} d="M32 50H429V447C429 463.569 415.569 477 399 477H32C15.4315 477 2 463.569 2 447V80C2 63.4315 15.4315 50 32 50Z"
                fill="#AAAAAA" fillOpacity={(dropping ? 0.2 : 0) + (dragging ? 0.1 : 0)} stroke="#AAAAAA" strokeWidth="4" />
            <rect x="427" width="53" height="97" fill="white" />
            <rect x="383" width="97" height="52" fill="white" />
            <line x1="429" y1="13" x2="429" y2="84" stroke="#AAAAAA" strokeWidth="4" />
            <line x1="392" y1="50" x2="464" y2="50" stroke="#AAAAAA" strokeWidth="4" />
            <path   visibility={dragging ? "hidden" : undefined} d="M169.101 232.5L215 153L260.899 232.5H169.101Z" stroke="#AAAAAA" strokeWidth="4" />
            <circle visibility={dragging ? "hidden" : undefined} cx="286" cy="313" r="48" stroke="#AAAAAA" strokeWidth="4" />
            <rect   visibility={dragging ? "hidden" : undefined} x="96" y="265" width="96" height="96" stroke="#AAAAAA" strokeWidth="4" />
            {dragging && <text x="214" y="275" fill="#000000" style={{
                fontSize: "32px",
                fontWeight: 400,
                opacity: 0.35,
                textAnchor: "middle"
            }}>Drop here to upload</text>}
        </svg>;

    case DisplayType.FILE:
        return <svg className="uploadbox" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <svg y="50">
                <path d="M2 32C2 15.4315 15.4315 2 32 2H399C415.569 2 429 15.4315 429 32V399C429 415.569 415.569 429 399 429H32C15.4315 429 2 415.569 2 399V32Z" fill="#AAAAAA" fillOpacity="0.7" stroke="#AAAAAA" strokeWidth="4"/>
                <rect x="90" y="112" width="252" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="90" y="211" width="252" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="90" y="310" width="252" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="90" y="244" width="190" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="90" y="277" width="64" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="164" y="277" width="178" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="90" y="145" width="129" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="229" y="145" width="113" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="90" y="178" width="92" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="192" y="178" width="103" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="305" y="178" width="37" height="8" fill="white" fillOpacity="0.8"/>
                <rect x="290" y="244" width="52" height="8" fill="white" fillOpacity="0.8"/>
                <foreignObject x="4" y="350" width="423" height="45">
                    <span title={heldFile?.name} style={{
                        //  fill="white" xmlSpace="preserve" fontFamily="Roboto" fontSize="36" letterSpacing="0em" textAnchor="middle"
                        display: "block",
                        color: "white",
                        padding: "0 24px",
                        fontSize: "36px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "center"
                    }}>
                        {heldFile?.name}
                    </span>
                </foreignObject>
            </svg>

            <svg className="close-btn" onClick={() => (setFile(null), setFileState(DisplayType.WAITING))}>
                <circle cx="411" cy="70" r="33" fill="#C4C4C4" stroke="#AAAAAA" strokeWidth="4"/>
                <rect x="396.5" y="81.73" width="37" height="4" transform="rotate(-45 396.5 81.73)" fill="white"/>
                <rect x="399.329" y="55.5668" width="37" height="4" transform="rotate(45 399.329 55.5668)" fill="white"/>
            </svg>
        </svg>;

    case DisplayType.IMAGE:
        return <svg className="uploadbox" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <svg y="50">
                <path d="M32 2H399C415.569 2 429 15.4315 429 32V399C429 415.569 415.569 429 399 429H32C15.4315 429 2 415.569 2 399V32C2 15.4315 15.4315 2 32 2Z" fill="#AAAAAA" stroke="#AAAAAA" strokeWidth="4"/>
                {<foreignObject x="4" y="4" width="423" height="422">
                    <img draggable="false" src={preview || loadingImage} style={{
                        objectFit: "cover", 
                        borderRadius: 28,
                        userSelect: "none"
                    }} width="423" height="422"/>
                </foreignObject>}
            </svg>

            <svg className="close-btn" onClick={() => (setFile(null), setFileState(DisplayType.WAITING))}>
                <circle cx="411" cy="70" r="33" fill="#C4C4C4" stroke="#AAAAAA" strokeWidth="4"/>
                <rect x="396.5" y="81.73" width="37" height="4" transform="rotate(-45 396.5 81.73)" fill="white"/>
                <rect x="399.329" y="55.5668" width="37" height="4" transform="rotate(45 399.329 55.5668)" fill="white"/>
            </svg>
        </svg>;
    
    }
};
