import { NavLink, useNavigate, useSearchParams } from 'react-router'
import ImportSearch from '../../assets/icons/icon-search.svg?react'
import IconSettings from '../../assets/icons/icon-settings.svg?react'


export default function InputSearch() {


    const [_, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const handlerParams = (value: string) => {
        setSearchParams(value ? { q: value } : {});
        navigate(`/search?q=${value}`)
    };

    return (
        <section className='flex items-center justify-between gap-5'>

            <div className='w-full lg:w-fit h-fit flex items-center gap-2 border border-custom-neutral-300 dark:border-custom-neutral-600 rounded-custom-8 px-[16px] py-[12px]'>
                <ImportSearch className="text-custom-neutral-500 dark:text-custom-neutral-400" />

                <input
                    className="w-full lg:w-[230px] text-custom-neutral-500 dark:text-custom-neutral-300 focus:outline-none"
                    type="text"
                    onChange={e => handlerParams(e.target.value)}
                    placeholder="Search by title, content, or tags…"
                />
            </div>
            <NavLink to="/settings" viewTransition>

                <IconSettings className=" hidden lg:block text-custom-neutral-500 dark:text-custom-neutral-400 " />
            </NavLink>
        </section>
    )
}
