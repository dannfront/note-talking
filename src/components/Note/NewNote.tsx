
import RenderNotesDesktop from "../shared/RenderNotesDesktop";
import Note from "../Note/Note";
import ComplementGrid from "../ComplementGrid";
import useGetNotes from "../../hooks/Notes/useGetNotes";
import { Note as typeNote } from "../../types/notes";



export default function NewNote() {

    const queryNotes = useGetNotes()

    const notes = queryNotes.data as typeNote[] | undefined



    return (
        <>
            <RenderNotesDesktop notes={notes!} path="/notes/note/" isLoading={queryNotes.isLoading} />
            <Note isNewNote />
            <ComplementGrid />
        </>
    )
}
