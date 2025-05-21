import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewNote } from '../../supabase/notes'
import { CreateNote } from '../../types/createNote'
import toast from 'react-hot-toast'

export default function useCreateNote() {
    const invalidateQuery = useQueryClient()
    const query = useMutation({

        mutationFn: async (newNote: CreateNote) => {

            return await createNewNote(newNote)

        },
        onSuccess: () => {
            invalidateQuery.invalidateQueries({ queryKey: ["getNotes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["notes-archived"] })
            invalidateQuery.invalidateQueries({ queryKey: ["all-notes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["tags"] })
            toast.success("Note created successfully")
        },
        onError: () => {
            toast.error("Error creating note")
        }
    })

    return (
        query
    )
}
