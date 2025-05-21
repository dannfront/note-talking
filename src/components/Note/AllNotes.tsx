import AddNote from "../AddNote";
import EmptyNotes from "../EmptyNotes";
import Main from "../shared/Main";
import CardNote from "../CardNote";
import RenderNotesDesktop from "../shared/RenderNotesDesktop";
import ComplementGrid from "../ComplementGrid";
import useGetNotes from "../../hooks/Notes/useGetNotes";
import { Note } from "../../types/notes";


export default function AllNotes() {

    const notesQuery = useGetNotes()

    const notes = notesQuery.data as Note[] | undefined

    return (
        <>
            <RenderNotesDesktop notes={notes!} path="/notes/note/" isLoading={notesQuery.isPending} />

            <Main className="pb-20">

                {notes?.length !== 0 ?


                    <ul className="flex flex-col gap-5 lg:hidden">
                        {
                            notes?.map(note => (

                                <CardNote key={note.title} note={note} path="/notes/note/" />
                            ))
                        }
                    </ul>
                    :
                    <div className="lg:hidden">

                        <EmptyNotes />
                    </div>
                }



                <div className="lg:hidden ">

                    <AddNote />
                </div>
            </Main>

            <ComplementGrid />
        </>
    )
}
