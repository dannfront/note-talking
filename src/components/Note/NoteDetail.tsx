import { useParams } from 'react-router'
import RenderNotesDesktop from '../shared/RenderNotesDesktop'
import Note from '../Note/Note'
import { Note as Inote } from '../../types/notes'
import RestoreAndDelete from '../Note/RestoreAndDelete'
import useGetNotes from '../../hooks/Notes/useGetNotes'

export default function NoteDetail() {
    const params = useParams()
    const notesQuery = useGetNotes()

    if (notesQuery.isLoading) {
        return <div className='hidden lg:dark:bg-custom-neutral-950 lg:block lg:row-span-4 lg:border-r lg:px-[16px] lg:border-r-custom-neutral-800 lg:h-full'></div>
    }

    const notes = notesQuery.data as Inote[] | undefined



    const note = notes?.find(note => note.id == params.id)



    return (
        <>

            <RenderNotesDesktop notes={notes!} path="/notes/note/" isLoading={notesQuery.isLoading} />

            <Note key={note?.id} id={note?.id} title={note?.title} content={note?.content} tags={note?.Tags.tags} lastEdited={note?.lastEdited} />

            <RestoreAndDelete id={note?.id} isArchive={note?.isArchived || false} />

        </>
    )
}
