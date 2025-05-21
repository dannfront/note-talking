import useTitleHeightAuto from "../../hooks/Notes/useTitleHeightAuto";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    name?: string;
}

export default function TittleNote({ value, onChange, onBlur, name }: Props) {

    const [textareaRef, handleInput] = useTitleHeightAuto();

    return (
        <textarea
            ref={textareaRef}
            className="tittle w-full max-w-[90%] h-auto text-2xl text-balance text-custom-neutral-950 dark:text-white font-bold tracking-[-0.5px] resize-none overflow-hidden bg-transparent focus:outline-none pt-2"
            value={value}
            onInput={(e) => {
                handleInput();
                onChange?.(e.currentTarget.value);
            }}
            onBlur={onBlur}
            name={name}
            placeholder="Enter a title..."
        />
    );
}