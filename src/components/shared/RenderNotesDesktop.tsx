
import AddNote from '../AddNote'
import CardNote from '../CardNote'
import { Note } from '../../types/notes'
import EmptyNotes from '../EmptyNotes'
import Loader from '../loaders/Loader'

interface Props {
    notes: Note[]
    path: string
    isLoading: boolean

}

export default function RenderNotesDesktop({ notes, path, isLoading }: Props) {

    return (


        <section className='hidden bg-white lg:dark:bg-custom-neutral-950 lg:block lg:row-span-4 lg:border-r lg:border-r-custom-neutral-200 lg:dark:border-r-custom-neutral-800 lg:px-[16px]  lg:h-full' >
            <div className="flex flex-col h-full">
                <AddNote />
                {isLoading && <Loader />}
                {notes?.length === 0 ?

                    <EmptyNotes />
                    :
                    <ul className="mt-5 divide-y  divide-custom-neutral-200 dark:divide-custom-neutral-800 overflow-y-auto no-scrollbar flex-1">
                        {
                            notes?.map((note) => {

                                return <CardNote key={note.id} note={note} path={path} />
                            })
                        }
                    </ul>
                }
            </div>
        </section >



    )
}
