import { useNavigate } from "react-router"
import IconPlus from "../assets/icons/icon-plus.svg?react"

export default function AddNote() {

    const navigate = useNavigate()

    function handlerNavigation() {
        navigate("/new-note", { viewTransition: true })
    }

    return (
        <button onClick={handlerNavigation} className="block  fixed lg:relative bottom-20 lg:bottom-auto right-5 lg:right-auto size-12 lg:size-auto mt-10 lg:mt-5 rounded-custom-full lg:px-[16px] lg:py-[12px] lg:rounded-custom-8 bg-custom-blue-500 lg:w-full cursor-pointer">

            <IconPlus className="text-white size-6 cursor-pointer mx-auto lg:hidden" />
            <p className="hidden lg:block text-white">+ Create New Note</p>
        </button>
    )
}
