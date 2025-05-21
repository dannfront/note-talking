import { useNavigate } from "react-router"
import IconArrowLeft from "../assets/icons/icon-arrow-left.svg?react"
export default function ButtonBack() {
    const navigate = useNavigate()



    return (
        <button className="text-custom-neutral-600 dark:text-custom-neutral-300 text-sm tracking-[-0.2px] flex items-center gap-1 cursor-pointer lg:hidden" onClick={() => navigate(-1)}>
            <span>
                <IconArrowLeft className="size-5" />
            </span>
            Go Back
        </button>
    )
}
