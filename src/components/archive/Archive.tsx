
import Main from "../shared/Main";
import RenderNotesDesktop from "../shared/RenderNotesDesktop";
import CardNote from "../CardNote";
import ComplementGrid from "../ComplementGrid";
import useGetNotesArchived from "../../hooks/Notes/useGetNotesArchived";
import { Note } from "../../types/notes";
import Loader from "../loaders/Loader";

export default function Archive() {
    const archivedQuery = useGetNotesArchived()


    const notes = archivedQuery.data as Note[] | undefined

    return (
        <>

            <RenderNotesDesktop notes={notes!} path="/archive/note/" isLoading={archivedQuery.isLoading} />
            <Main>
                <ul className="flex flex-col gap-5 lg:hidden">
                    {archivedQuery.isLoading ?
                        <Loader />
                        :
                        notes?.map(note => (

                            <CardNote key={note.id} note={note} path="/archive/note/" />
                        ))
                    }
                </ul>
            </Main>
            <ComplementGrid />
        </>
    )
}
