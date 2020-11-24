import React, { FC, useEffect, useRef, useState } from "react";

export const UploadBox: FC<{

}> = (props) => {
    const dragCounter = useRef(0), dragTarget = useRef<SVGSVGElement>(null);
    const [dragging, setDragging] = useState(false);
    const [dropping, setDropping] = useState(false);

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
            setDropping(true);
        } else {
            setDropping(false);
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

    return (
        <svg className="uploadbox" ref={dragTarget} viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path strokeDasharray={dragging ? 16 : undefined} d="M32 50H429V447C429 463.569 415.569 477 399 477H32C15.4315 477 2 463.569 2 447V80C2 63.4315 15.4315 50 32 50Z"
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
        </svg>
    );
};
