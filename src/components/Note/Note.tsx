
import IconTags from '../../assets/icons/icon-tag.svg?react'
import IconClock from "../../assets/icons/icon-clock.svg?react"
import TittleNote from './TittleNote'
import type { Note } from '../../types/notes'
import EditNote from './EditNote'
import { Controller, useForm } from 'react-hook-form'
import Main from '../shared/Main'
import { useNavigate } from 'react-router'
import useCreateNote from '../../hooks/Notes/useCreateNote'
import useUpdateNote from '../../hooks/Notes/useUpdateNote'

interface Props {
    isNewNote?: boolean
    id?: string
    title?: string
    content?: string
    tags?: string[]
    lastEdited?: string
}



export default function Note({ id, title = "", content = "", tags = [], lastEdited = "Not yet saved", isNewNote = false }: Props) {



    const queryNote = useCreateNote()
    const queryUpdateNote = useUpdateNote()
    const { register, handleSubmit, formState: { errors }, control } = useForm(
        {
            defaultValues: {
                title: title,
                content: content,
                tags: tags.length > 0 ? tags.join(",") : ""
            },

        }
    )
    const navigate = useNavigate()


    const onSubmit = async (data: any) => {



        if (isNewNote) {
            const newNote = {
                title: data.title,
                content: data.content,
                tags: data.tags.split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag !== ""),
                isArchived: false,
                lastEdited: new Date()
            }

            const noteId = await queryNote.mutateAsync({ title: newNote.title, content: newNote.content, last_edited: newNote.lastEdited, isArchived: newNote.isArchived, tags: newNote.tags })

            if (!noteId) {

                return console.log("Error creating note")
            }

            return navigate(`/notes/note/${noteId}`, { viewTransition: true })
        }


        const note = {
            id: Number(id),
            title: data.title,
            content: data.content,
            lastEdited: new Date(),
            tags: data.tags.split(",").map((tag: string) => tag.trim()).filter((tag: string) => tag !== ""),
        }



        const noteUpdate = await queryUpdateNote.mutateAsync(note)

        if (!noteUpdate) {

            return console.log("Error updating note")
        }

        navigate(`/notes/note/${id}`, { viewTransition: true })


    }


    return (
        <Main className="flex flex-col-reverse lg:flex-col lg:h-auto">
            <form id='form-note' onSubmit={handleSubmit(onSubmit)} className="flex flex-col grow pt-2">
                <div>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue={title}
                        rules={{
                            required: "Please enter a title",
                        }}

                        render={
                            ({ field }) => {
                                return <TittleNote {...field} />
                            }
                        }

                    />
                    {errors.title?.message && <p className="text-red-500 pb-2">{errors.title?.message}</p>}

                    <div className="flex  gap-10 ">
                        <div className="flex gap-2" >
                            <IconTags className="text-custom-neutral-700 dark:text-custom-neutral-300" />
                            <p className="text-custom-neutral-700 dark:text-custom-neutral-300">
                                Tags
                            </p>
                        </div>

                        <textarea
                            className=" w-full max-w-[90%] h-auto  text-balance text-custom-neutral-950 dark:text-white tracking-[-0.5px] resize-none overflow-hidden bg-transparent focus:outline-none"
                            placeholder="Add tags separated by commas (e.g. Work, Planning)"
                            {...register("tags", {
                                required: "Please add at least one tag",

                                validate: (tags) => {

                                    const regex = /,+/;
                                    return regex.test(tags) || "format is invalid, please use commas to separate tags"
                                }

                            })}
                        />

                    </div>
                    {errors.tags?.message && <p className="text-red-500 pb-2">{errors.tags?.message}</p>}

                    <div className="flex gap-5">
                        <div className='flex gap-2'>

                            <p className=' text-custom-neutral-700 dark:text-custom-neutral-300 capitalize flex items-center gap-2'>
                                <span className=''>
                                    <IconClock className='size-6' />
                                </span>

                            </p>
                            <p className="text-custom-neutral-700 dark:text-custom-neutral-300">
                                Lats Edited <span></span>
                            </p>
                        </div>
                        <p className="text-custom-neutral-700 dark:text-custom-neutral-400">{lastEdited}</p>
                    </div>
                </div>

                <section className={`grow ${errors.content?.message ? 'pb-10' : ''}`}>
                    <textarea
                        id="content"
                        className='text-custom-neutral-800 dark:text-custom-neutral-100 h-full w-full focus:outline-none resize-none no-scrollbar lg:pt-5 pb-20 lg:pb-5 lg:border-t lg:border-t-custom-neutral-200 lg:dark:border-t-custom-neutral-800'
                        {...register("content", {
                            required: "Please enter a note",
                        })}
                        placeholder="Start typing your note here…"
                    />
                    {errors.content?.message && <p className="text-red-500">{errors.content?.message}</p>}
                </section>

            </form>

            <EditNote disabled={queryNote.isPending || queryUpdateNote.isPending} />

        </Main>
    )
}
