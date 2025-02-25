import React, { ChangeEvent, FC } from "react";
import { clazz } from "../layout/utils";

export const TextField: FC<{
    type?: "text" | "password"
    placeholder?: string
    error?: boolean
    value?: string
    onChange?: (x: string) => void
    autofocus?: boolean
    multiline?: boolean
    onConfirm?: (x: string) => void
    className?: string
}> = (props) => {
    const controlProps = {
        autoFocus: props.autofocus,
        type: props.type ?? "text",
        placeholder: props.placeholder,
        onChange: (t: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onChange?.(t.target.value),
        value: props.value,
        onKeyPress: (e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
                props.onConfirm?.((e.target as HTMLInputElement).value);
            }
        }
    };

    return (
        <div className={clazz(props.error ? "bg-error/15 text-error/85" : "", props.className)}>
            {props.multiline
                ? <textarea 
                    className="w-full bg-input text-text font-inherit text-lg leading-10 rounded-lg outline-none p-3 placeholder:font-bold placeholder:opacity-40"
                    {...controlProps}/>
                : <input 
                    className="w-full bg-input text-text font-inherit text-lg leading-10 rounded-lg outline-none pl-4 placeholder:font-bold placeholder:opacity-40"
                    {...controlProps}/>}
        </div>
    );
};
