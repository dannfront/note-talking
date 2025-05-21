import ButtonBack from '../ButtonBack'
import IconArchive from '../../assets/icons/icon-archive.svg?react'
import IconDelete from '../../assets/icons/icon-delete.svg?react'
import IconRestore from '../../assets/icons/icon-restore.svg?react'
import { useState } from 'react'
import Modal from '../Modal'
import { useLocation, useNavigate } from 'react-router'
import useRestoreNote from './useRestoreNote'
import useArchiveNote from '../../hooks/Notes/useArchiveNote'
import useDeleteNote from '../../hooks/Notes/useDeleteNote'



export default function EditNote({ disabled = false }: { disabled?: boolean }) {


    const [openArchive, setOpenArchive] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const path = useLocation();
    const id = path.pathname.split('/')[3]
    const queryDelete = useDeleteNote(Number(id))
    const queryArchive = useArchiveNote(Number(id))
    const queryRestore = useRestoreNote(Number(id))
    const navigate = useNavigate()
    const archiveOrRestore = path.pathname.includes('archive') ? true : false

    function openModalDeelete() {
        setOpenDelete(true)
    }

    function oprenModalArchive() {
        setOpenArchive(true)
    }


    async function deleteNote() {

        const isDelete = await queryDelete.mutateAsync()


        if (!isDelete) return setOpenDelete(false)

        setOpenDelete(false)

        return navigate(`/notes`, { viewTransition: true })
    }


    async function archiveNote() {

        const archive = await queryArchive.mutateAsync()

        if (!archive) return setOpenArchive(false)

        setOpenArchive(false)
        return navigate(`/archive/note/${id}`, { viewTransition: true })
    }

    async function restore() {


        const restore = await queryRestore.mutateAsync()

        if (!restore) return

        return navigate(`/notes/note/${id}`, { viewTransition: true })
    }

    return (
        <>
            <div className=' border-b border-b-custom-neutral-200 dark:border-b-custom-neutral-800 pb-2 text-sm grow-0 flex justify-between lg:border-0 '>
                <ButtonBack />

                <div className='lg:w-full flex items-center gap-3 lg:border-t lg:border-t-custom-neutral-200 lg:dark:border-t-custom-neutral-800 '>
                    <div className='text-custom-neutral-600 dark:text-custom-neutral-300 flex gap-2 lg:hidden'>

                        <button className='cursor-pointer' onClick={openModalDeelete}>
                            <IconDelete className=' size-5' />
                        </button>


                        {

                            archiveOrRestore ?

                                <button className='cursor-pointer' onClick={restore} disabled={queryDelete.isPending || queryRestore.isPending || queryArchive.isPending} >
                                    <IconRestore className=' size-5' />
                                </button>
                                :
                                <button className='cursor-pointer' onClick={oprenModalArchive} disabled={queryDelete.isPending || queryRestore.isPending || queryArchive.isPending} >
                                    <IconArchive className=' size-5' />
                                </button>
                        }

                    </div>

                    <button className='text-custom-neutral-300' type="button">cancel</button>
                    <button
                        className="cursor-pointer text-custom-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled || queryDelete.isPending || queryRestore.isPending || queryArchive.isPending}
                        type="submit"
                        form="form-note"
                    >
                        Save Note
                    </button>
                </div>
            </div>

            <Modal
                title="Delete Note"
                description="Are you sure you want to permanently delete this note? This action cannot be undone."
                archiveButtonText="Delete Note"
                cancelButtonText="Cancel"
                onHandler={deleteNote}
                isOpen={openDelete}
                setIsOpen={setOpenDelete}
                Icon={<IconDelete className="text-white" />}
            />


            <Modal
                title="Archive Note"
                description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                archiveButtonText="Archive Note"
                cancelButtonText="Cancel"
                onHandler={archiveNote}
                isOpen={openArchive}
                setIsOpen={setOpenArchive}
                Icon={<IconArchive className="text-white" />}
            />
        </>
    )
}
