import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function Main({ children, className = "" }: Props) {
    return (
        <main
            className={`relative w-max-[90%] w-full bg-white dark:bg-custom-neutral-950 px-[16px] mx-auto lg:row-span-4 lg:col-span-2 lg:border-r lg:border-r-custom-neutral-200 lg:dark:border-r-custom-neutral-800 ${className}`}

        >
            {children}
        </main>
    );
}
