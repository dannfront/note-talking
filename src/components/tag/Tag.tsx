
import Main from '../shared/Main'
import RenderNotesDesktop from '../shared/RenderNotesDesktop'
import { useParams } from 'react-router'
import ComplementGrid from '../ComplementGrid'
import ListTagItem from '../ListTagItem'
import useGetAllNotes from '../../hooks/Notes/useGetAllNotes'
import { Note } from '../../types/notes'

export default function Tag() {
    const { tag } = useParams()
    const notesQuery = useGetAllNotes()
    const notes = notesQuery.data as Note[] | undefined

    const notesTag = notes?.filter(note => note.Tags.tags.includes(tag ?? "")) ?? []



    return (
        <>
            <RenderNotesDesktop notes={notesTag} path={`/tag/${tag}/`} isLoading={notesQuery.isLoading} />

            <Main className=''>

                <section className='flex flex-col gap-5 lg:hidden'>
                    <ListTagItem isMobil />
                </section>

            </Main>

            <ComplementGrid />
        </>
    )
}
