import { restoreNote } from '../../supabase/notes'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useRestoreNote(id: number) {
    const invalidateQuery = useQueryClient()
    const query = useMutation({

        mutationFn: async () => {

            return restoreNote(id)

        },
        onSuccess: () => {
            invalidateQuery.invalidateQueries({ queryKey: ["getNotes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["notes-archived"] })
            invalidateQuery.invalidateQueries({ queryKey: ["all-notes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["tags"] })
        }
    })

    return (
        query
    )
}
