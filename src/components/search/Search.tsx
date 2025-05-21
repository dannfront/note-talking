import { useSearchParams } from "react-router";
import Main from "../shared/Main";
import ComplementGrid from "../ComplementGrid";
import InputSearch from "./InputSearch";
import CardNote from "../CardNote";
import { Note } from "../../types/notes";
import useGetAllNotes from "../../hooks/Notes/useGetAllNotes";
import SearchList from "./SearchList";

export default function Search() {

    const queryNotes = useGetAllNotes()
    const [searchParams] = useSearchParams()
    const notes = queryNotes.data as Note[] | undefined

    const q = searchParams.get("q") || ""

    const notesFiltered = notes?.filter(note => {
        if (note.title.toLowerCase().includes(q.toLowerCase()) || note.content.toLowerCase().includes(q.toLowerCase()) || note.Tags.tags.some(tag => tag.toLowerCase().includes(q.toLowerCase()))) {
            return note
        }
    }) as Note[]

    return (
        <>
            <SearchList notes={notesFiltered!} isLoading={queryNotes.isLoading} />
            <Main className="pb-20">
                <div className="lg:hidden">

                    <InputSearch />

                    {notesFiltered?.map(note => (
                        <CardNote key={note.id} note={note} path={`/notes/note/`} />
                    ))}

                </div>
            </Main>

            <ComplementGrid />
        </>
    )
}
