import { NavLink } from 'react-router'
import IconHome from "../../assets/icons/icon-home.svg?react";
import IconArchived from "../../assets/icons/icon-archive.svg?react"

export default function NavDesktop() {

    return (
        <nav className="hidden lg:block lg:content-center lg:w-full">
            <div className="lg:space-y-2">

                <NavLink className="block nav-desktop p-2" to={`/notes`}>
                    <p className="text-custom-neutral-950 dark:text-custom-neutral-200 flex items-center gap-2">
                        <span> <IconHome className='text-custom-neutral-950 dark:text-custom-neutral-200' /> </span> All Notes
                    </p>
                </NavLink>

                <NavLink className="block nav-desktop p-2" to={`/archive`}>
                    <p className="text-custom-neutral-950 dark:text-custom-neutral-200 flex items-center gap-2">
                        <span> <IconArchived className='text-custom-neutral-950 dark:text-custom-neutral-200' /> </span> Archived
                    </p>
                </NavLink>
            </div>
        </nav>
    )
}
