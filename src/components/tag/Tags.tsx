import { useLocation, useParams } from "react-router"
import RenderNotesDesktop from "../shared/RenderNotesDesktop";

import Note from "../Note/Note";
import { Note as Inote } from '../../types/notes'
import useGetAllNotes from "../../hooks/Notes/useGetAllNotes";
import RestoreAndDelete from "../Note/RestoreAndDelete";


export default function Tags() {
    const params = useParams()
    const path = useLocation()
    const notesQuery = useGetAllNotes()
    if (notesQuery.isLoading) {
        return <div className='hidden lg:dark:bg-custom-neutral-950 lg:block lg:row-span-4 lg:border-r lg:px-[16px] lg:border-r-custom-neutral-800 lg:h-full'></div>
    }
    const notes = notesQuery.data as Inote[] | undefined


    const tag = path.pathname.split("/")[2]

    const notesTag = notes?.filter(note => note.Tags.tags.includes(tag)) ?? []


    const note = notes?.find(note => note.id == params.id)


    return (
        <>
            <RenderNotesDesktop notes={notesTag!} path={`/tag/${tag}/`} isLoading={notesQuery.isLoading} />

            <Note key={note?.id} title={note?.title} content={note?.content} tags={note?.Tags.tags} lastEdited={note?.lastEdited} />

            <RestoreAndDelete id={note?.id} isArchive={note!.isArchived!} />
        </>
    )
}
