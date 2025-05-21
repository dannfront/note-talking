import { useParams } from "react-router"
import Main from "../shared/Main"
import { notes } from "../../data/data.json"
import CardNote from "../CardNote"
import ButtonBack from "../ButtonBack"
import useGetAllNotes from "../../hooks/Notes/useGetAllNotes"
import { Note } from "../../types/notes"

export default function TagsTag() {

    const { tag } = useParams()

    const notesQuery = useGetAllNotes()
    const notes = notesQuery.data as Note[] | undefined

    const notesTag = notes?.filter(note => note.Tags.tags.includes(tag ?? "")) ?? []




    return (

        <>
            {/* boton back */}

            <Main>
                <div className="space-y-2 mb-2 lg:hidden">

                    <ButtonBack />
                    <p className="text-custom-neutral-700 dark:text-custom-neutral-300">
                        All notes with the
                        <span className="text-custom-neutral-950 dark:text-white"> {tag} </span>
                        tag are shown here

                    </p>
                </div>
                <section>
                    {
                        notesTag?.map(note => (
                            <CardNote key={note.id} note={note} path={`/tag/${tag}/`} />
                        ))
                    }
                </section>


            </Main>
        </>
    )
}
