import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateNotes } from '../../supabase/notes'
import { UpdateNote } from '../../types/updateNote'
import toast from 'react-hot-toast'

export default function useUpdateNote() {
    const invalidateQuery = useQueryClient()
    const query = useMutation({

        mutationFn: async (note: UpdateNote) => {

            return await updateNotes(note)

        },

        onSuccess: async () => {
            await invalidateQuery.invalidateQueries({ queryKey: ["getNotes"] })
            await invalidateQuery.invalidateQueries({ queryKey: ["notes-archived"] })
            await invalidateQuery.invalidateQueries({ queryKey: ["all-notes"] })
            await invalidateQuery.invalidateQueries({ queryKey: ["tags"] })
            toast.success("Note updated successfully")
        },
        onError: () => {
            toast.error("Error updating note")
        }
    }

    )

    return query
}
