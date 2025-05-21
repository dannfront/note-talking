import { NavLink } from 'react-router'

import IconTag from "../assets/icons/icon-tag.svg?react"
interface Props {
    tag: string;
    isMobil?: boolean;

}

export default function TagItem({ tag, isMobil }: Props) {
    return (
        <li>

            <NavLink className="block tag p-1" to={!isMobil ? `/tag/${tag}` : `/tags/tag/${tag}`}>

                <p className="text-custom-neutral-700 dark:text-custom-neutral-200 flex gap-2 items-center">
                    <span>
                        <IconTag className="text-custom-neutral-700 dark:text-custom-neutral-200" />
                    </span>
                    {tag}
                </p>

            </NavLink>
        </li>

    )
}
