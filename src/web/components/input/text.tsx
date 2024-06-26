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
        <div className={clazz("textfield", props.error && "error")}>
            {props.multiline
                ? <textarea {...controlProps}/>
                : <input {...controlProps}/>}
        </div>
    );
};
