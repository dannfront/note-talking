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
    const notes = notesQuery.data as Inote[] | undefined


    const tag = path.pathname.split("/")[2]

    const notesTag = notes?.filter(note => note.Tags.tags.includes(tag)) ?? []


    const note = notes?.find(note => note.id == params.id)


    return (
        <>
            <RenderNotesDesktop notes={notesTag!} path={`/tag/${tag}/`} isLoading={notesQuery.isLoading} />

            <Note key={note?.id} id={note?.id} title={note?.title} content={note?.content} tags={note?.Tags.tags} lastEdited={note?.lastEdited} />

            <RestoreAndDelete id={note?.id} isArchive={note!.isArchived!} />
        </>
    )
}
