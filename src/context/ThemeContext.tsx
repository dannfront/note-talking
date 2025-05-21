import { createContext, useEffect } from "react";


const ThemeContext = createContext("light");


export default function ThemeProvider({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        const html = document.querySelector("html")!
        const theme = localStorage.getItem("theme") ?? ""

        if (theme === "") return

        if (theme === "dark") {
            return html.classList.add("dark")
        }

        html.classList.remove("dark")



    }, [])

    return (
        <ThemeContext.Provider value="">

            {children}

        </ThemeContext.Provider>
    )
}

