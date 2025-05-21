import IconRestore from "../../assets/icons/icon-restore.svg?react"
import IconDelete from "../../assets/icons/icon-delete.svg?react"
import IconArchive from "../../assets/icons/icon-archive.svg?react"
import { useState } from "react"
import Modal from "../Modal"
import useDeleteNote from "../../hooks/Notes/useDeleteNote"
import useArchiveNote from "../../hooks/Notes/useArchiveNote"
import useRestoreNote from "./useRestoreNote"
import { useNavigate } from "react-router"

interface Props {
    id?: string
    isArchive: boolean
}



export default function RestoreAndDelete({ id, isArchive }: Props) {

    const [openArchive, setOpenArchive] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const queryDelete = useDeleteNote(Number(id))
    const queryArchive = useArchiveNote(Number(id))
    const queryRestore = useRestoreNote(Number(id))


    console.log(isArchive);


    const navigate = useNavigate()



    function openModalArchive() {
        setOpenArchive(true)
    }

    function openModalDelete() {
        setOpenDelete(true)
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
        <section className="bg-white dark:bg-custom-neutral-950 hidden lg:block lg:col-start-5 lg:row-span-4 border-l border-l-custom-neutral-100 dark:border-l-custom-neutral-800 px-[16px] py-[20px] space-y-5">

            <>
                {isArchive ?
                    <button
                        disabled={queryDelete.isPending || queryRestore.isPending || queryArchive.isPending}
                        className="cursor-pointer w-full flex gap-2 text-black dark:text-white border border-custom-neutral-300 dark:border-custom-neutral-600 rounded-[8px] px-[16px] py-[12px]"
                        onClick={restore}>
                        <IconRestore />
                        Restore Note
                    </button>
                    :
                    <button
                        disabled={queryDelete.isPending || queryRestore.isPending || queryArchive.isPending}
                        className="cursor-pointer w-full flex gap-2 text-black dark:text-white border border-custom-neutral-300 dark:border-custom-neutral-600 rounded-[8px] px-[16px] py-[12px]"
                        onClick={openModalArchive}>
                        <IconArchive />
                        Archive Note
                    </button>
                }


                <button
                    disabled={queryDelete.isPending || queryRestore.isPending || queryArchive.isPending}
                    className="cursor-pointer w-full flex gap-2 text-black dark:text-white border border-custom-neutral-300 dark:border-custom-neutral-600 rounded-[8px] px-[16px] py-[12px]"
                    onClick={openModalDelete}>
                    <IconDelete />
                    Delete Note
                </button>
            </>

            <Modal
                title="Archive Note"
                description="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                archiveButtonText="Archive Note"
                cancelButtonText="Cancel"
                onHandler={() => archiveNote()}
                isOpen={openArchive}
                setIsOpen={setOpenArchive}
                disabled={queryArchive.isPending}
                Icon={<IconArchive className="text-white" />}
            />

            <Modal
                title="Delete Note"
                description="Are you sure you want to permanently delete this note? This action cannot be undone."
                archiveButtonText="Delete Note"
                cancelButtonText="Cancel"
                onHandler={() => deleteNote()}
                isOpen={openDelete}
                setIsOpen={setOpenDelete}
                disabled={queryDelete.isPending}
                Icon={<IconDelete className="text-white" />}
            />

        </section >
    )
}

