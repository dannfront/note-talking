import { NavLink, useNavigate } from "react-router";
import Modal from "../Modal";
import IconColorTheme from "../../assets/icons/icon-sun.svg?react"
import IconChangue from "../../assets/icons/icon-lock.svg?react"
import IconLogout from "../../assets/icons/icon-logout.svg?react"
import { useState } from "react";
import useSignOut from "../../hooks/Notes/useSignOut";


export default function ListSettings() {
    const [openModal, setOpenModal] = useState(false)
    const singoutQuery = useSignOut()
    const navigate = useNavigate()

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleSignOut = async () => {
        await singoutQuery.mutateAsync()
        setOpenModal(false)
        navigate("/login", { viewTransition: true, replace: true })
    }

    return (
        <div>

            <ul className="space-y-5">
                <NavLink to="/settings/color-theme" className="note-active" viewTransition>
                    <article className='flex items-center gap-2'>

                        <IconColorTheme className="size-[22px] text-custom-neutral-950 dark:text-custom-neutral-200" />
                        <p className="text-[17px] text-custom-neutral-950 dark:text-custom-neutral-200">Color Theme</p>
                    </article>
                </NavLink>

                <NavLink to="/settings/change-password" className="flex items-center gap-2 note-active mt-2" viewTransition>
                    <article className='flex items-center gap-2'>

                        <IconChangue className="size-[20px] text-custom-neutral-950 dark:text-custom-neutral-200" />
                        <p className="text-[17px] text-custom-neutral-950 dark:text-custom-neutral-200">Change Password</p>
                    </article>
                </NavLink>

                <button className="w-full cursor-pointer flex items-center gap-2 border-t border-custom-neutral-200 dark:border-custom-neutral-800 pt-3"
                    onClick={handleOpenModal}>
                    <IconLogout className="size-[20px] text-custom-neutral-950 dark:text-custom-neutral-200" />
                    <p className="text-[17px] text-custom-neutral-950 dark:text-custom-neutral-200">Lagout</p>
                </button>
            </ul>

            <Modal
                title='Log out'
                description='Are you sure you want to log out?'
                archiveButtonText='Log out'
                cancelButtonText='Cancel'
                onHandler={handleSignOut}
                isOpen={openModal}
                setIsOpen={setOpenModal}
                Icon={<IconLogout className="size-[20px] text-custom-neutral-950 dark:text-custom-neutral-200" />}
                disabled={singoutQuery.isPending}
            />
        </div>
    )
}
