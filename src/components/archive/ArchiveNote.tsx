
import RenderNotesDesktop from '../shared/RenderNotesDesktop'
import NoteComponent from '../Note/Note'
import { useParams } from 'react-router'
import RestoreAndDelete from '../Note/RestoreAndDelete'
import useGetNotesArchived from '../../hooks/Notes/useGetNotesArchived'
import { Note as NoteType } from '../../types/notes'

export default function ArchiveNote() {
    const params = useParams()
    const archivedQuery = useGetNotesArchived()


    const notes = archivedQuery.data as NoteType[] | undefined
    const note = notes?.find(note => note.id == params.id)




    return (
        <>
            <RenderNotesDesktop notes={notes!} path='/archive/note/' isLoading={archivedQuery.isLoading} />
            <NoteComponent key={note?.id} title={note?.title} content={note?.content} tags={note?.Tags.tags} lastEdited={note?.lastEdited} />
            <RestoreAndDelete id={note?.id} isArchive={note?.isArchived || true} />
        </>
    )
}
