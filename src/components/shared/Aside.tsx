
import Logo from "../../assets/icons/logo.svg?react"
import ListTagItem from "../ListTagItem";
import NavDesktop from "./NavDesktop";

function Aside() {


    return (
        <aside className=' lg:grid lg:grid-rows-[auto_120px_1fr] bg-custom-neutral-100 lg:bg-white dark:bg-custom-neutral-800 lg:dark:bg-custom-neutral-950   px-[16px] md:px-[32px] py-[12px] md:py-[16px] lg:row-span-5 lg:row-start-1 lg:border-r lg:border-r-custom-neutral-200 lg:dark:border-r-custom-neutral-800'>
            <Logo className="fill-blue-500 dark:fill-white" />

            <NavDesktop />

            <section className="hidden lg:block lg:h-full lg:overflow-auto lg:border-t border-t-custom-neutral-200 lg:dark:border-t-custom-neutral-800">

                <div className="flex flex-col h-full pt-5">

                    <ListTagItem />

                </div>

            </section>
        </aside>
    )
}

export default Aside
