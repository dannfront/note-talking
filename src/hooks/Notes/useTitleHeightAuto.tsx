import { useEffect, useRef } from "react";


export default function useTitleHeightAuto() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        const textAreaTittle = textareaRef.current
        textAreaTittle!.style.height = "auto"
        textAreaTittle!.style.height = textAreaTittle!.scrollHeight + "px"
    }, [])

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea!.style.height = 'auto';
        textarea!.style.height = textarea!.scrollHeight + 'px';
    };

    return (
        [textareaRef, handleInput] as const
    )
}
