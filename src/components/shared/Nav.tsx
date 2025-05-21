import LogoHome from "../../assets/icons/icon-home.svg?react"
import IconSearch from "../../assets/icons/icon-search.svg?react"
import IconArchive from "../../assets/icons/icon-archive.svg?react"
import IconTags from "../../assets/icons/icon-tag.svg?react"
import IconSettings from "../../assets/icons/icon-settings.svg?react"
import { NavLink } from "react-router"

export default function Nav() {
    return (
        <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-custom-neutral-950 px-[16px] py-[12px] dark:border-t dark:border-t-custom-neutral-800 row-start-4 lg:hidden z-10'>
            <ul className="flex justify-between items-center md:divide-x md:divide-custom-neutral-200 md:dark:divide-custom-neutral-800">
                <li className="w-full list-link pr-2">
                    <NavLink to="/notes" className="flex justify-center py-[4px]" viewTransition>
                        <LogoHome className="text-custom-neutral-600" />
                    </NavLink>
                </li>
                <li className="w-full list-link pr-2 pl-2">
                    <NavLink to="/search" className="flex justify-center py-[4px]" viewTransition>
                        <IconSearch className="text-custom-neutral-600" />
                    </NavLink>
                </li>
                <li className="w-full list-link pr-2 pl-2">
                    <NavLink to="/archive" className="flex justify-center py-[4px]" viewTransition>
                        <IconArchive className="text-custom-neutral-600 hover:text-custom-blue-500" />
                    </NavLink>
                </li>
                <li className="w-full list-link pr-2 pl-2">
                    <NavLink to="/tags" className="flex justify-center py-[4px]" viewTransition>
                        <IconTags className="text-custom-neutral-600" />
                    </NavLink>
                </li>
                <li className="w-full list-link pl-2">
                    <NavLink to="/settings" className="flex justify-center py-[4px]" viewTransition>
                        <IconSettings className="text-custom-neutral-600" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
