import AddNote from '../AddNote'
import CardNote from '../CardNote'
import { Note } from '../../types/notes'

interface Props {
    notes: Note[]
    isLoading: boolean

}

export default function SearchList({ notes, isLoading }: Props) {

    if (isLoading) {
        return <section className='hidden bg-white lg:dark:bg-custom-neutral-950 lg:block lg:row-span-4 lg:border-r lg:px-[16px] lg:border-r-custom-neutral-800 lg:h-full'>
        </section>
    }


    return (



        <section className='hidden bg-white lg:dark:bg-custom-neutral-950 lg:block lg:row-span-4 lg:border-r lg:border-r-custom-neutral-200 lg:dark:border-r-custom-neutral-800 lg:px-[16px]  lg:h-full'>

            <div className="flex flex-col h-full">
                <AddNote />

                <ul className="mt-5 divide-y  divide-custom-neutral-200 dark:divide-custom-neutral-800 overflow-y-auto no-scrollbar flex-1">
                    {
                        notes?.map((note) => {

                            return <CardNote key={note.id} note={note} path={note.isArchived ? "/archive/note/" : "/notes/note/"} />
                        })
                    }
                </ul>
            </div>
        </section>

    )
}
