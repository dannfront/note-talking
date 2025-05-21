import { NavLink } from "react-router";
import { Note } from "../types/notes"

interface Props {
    note: Note
    path: string
}

export default function CardNote({ note, path }: Props) {
    const { title, Tags, lastEdited } = note
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(lastEdited)

    return (
        <NavLink key={note.id} className="block pb-2 note-active" to={`${path}${note.id}`} viewTransition >

            <article className=" space-y-2 ">
                <h3 className="text-[16px] tracking-[-0.3px] leading-[2.0] text-custom-neutral-950 dark:text-white text-balance font-semibold">{title}</h3>

                <div className="flex gap-2 items-center flex-wrap">
                    {Tags.tags.map((tag, i) => (
                        <span key={tag + i} className="text-center text-custom-neutral-950 dark:text-white bg-custom-neutral-200 dark:bg-custom-neutral-600 rounded-custom-4 px-[4px] py-[2px]">{tag}</span>
                    ))}
                </div>

                <p className="text-[12px] tracking-[-0.2px] text-custom-neutral-700 dark:text-custom-neutral-300">{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</p>
            </article>
        </NavLink>

    )
}
