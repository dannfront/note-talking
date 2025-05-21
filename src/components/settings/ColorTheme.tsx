import ComplementGrid from "../ComplementGrid";
import IconSun from "../../assets/icons/icon-sun.svg?react"
import IconMoon from "../../assets/icons/icon-moon.svg?react"
import Main from "../shared/Main";
import NavSettings from "../shared/NavSettings";
import { useState } from "react";


export default function ColorTheme() {

    const [theme, setTheme] = useState<string | null>(localStorage.getItem("theme"))

    function handleChangeThemeLight() {
        localStorage.setItem("theme", "light")
        setTheme("light")

    }

    function handleChangeThemeDark() {
        localStorage.setItem("theme", "dark")
        setTheme("dark")

    }

    function changeTheme() {
        const html = document.querySelector("html")
        const theme = localStorage.getItem("theme") as string

        if (theme! === "dark") {


            return html?.classList.add("dark")

        }

        return html?.classList.remove("dark")
    }



    return (
        <>

            <NavSettings />

            <Main>

                <article className="py-5 space-y-5">
                    <section className={`${theme === "light" ? "bg-custom-neutral-200 dark:bg-custom-neutral-700" : ""} rounded-custom-12 p-2`}>

                        <button onClick={handleChangeThemeLight} className="cursor-pointer flex items-center gap-4">

                            <div className="w-fit bg-white dark:bg-custom-neutral-950 rounded-custom-12 border  border-custom-neutral-200 dark:border-custom-neutral-700">
                                <IconSun className="size-[35px] text-custom-neutral-950 dark:text-white" />
                            </div>
                            <div className="text-left">
                                <h2 className="text-[18px] tracking-[-0.3px] leading-[2.0] text-custom-neutral-950 dark:text-white text-balance font-semibold">Light Mode</h2>
                                <p className="text-[14px] tracking-[-0.2px] text-custom-neutral-700 dark:text-custom-neutral-300">
                                    pick a clean and simple color theme for your notes
                                </p>
                            </div>
                        </button>
                    </section>

                    <section className={`${theme === "dark" ? "bg-custom-neutral-200 dark:bg-custom-neutral-700" : ""} rounded-custom-12 p-2`}>
                        <button onClick={handleChangeThemeDark} className="cursor-pointer flex items-center gap-4">

                            <div className="w-fit bg-white dark:bg-custom-neutral-950 rounded-custom-12 border  border-custom-neutral-200 dark:border-custom-neutral-700">
                                <IconMoon className="size-[35px] text-custom-neutral-950 dark:text-white" />
                            </div>
                            <div className="text-left">
                                <h2 className="text-[18px] tracking-[-0.3px] leading-[2.0] text-custom-neutral-950 dark:text-white text-balance font-semibold">Dark Mode</h2>
                                <p className="text-[14px] tracking-[-0.2px] text-custom-neutral-700 dark:text-custom-neutral-300">
                                    Select a sleek and modern dark theme
                                </p>
                            </div>
                        </button>
                    </section>
                </article>

                <button onClick={changeTheme}
                    className="block w-fit cursor-pointer bg-custom-blue-500 text-white rounded-custom-8 py-[16px] px-[12px] ml-auto"
                    type="button">
                    Apply Changes
                </button>

            </Main>
            <ComplementGrid />

        </>
    )
}
