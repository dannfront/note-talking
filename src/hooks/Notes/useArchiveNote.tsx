import { useMutation, useQueryClient } from "@tanstack/react-query"
import { archivedNote } from "../../supabase/notes"
import toast from "react-hot-toast"


export default function useArchiveNote(id: number) {
    const invalidateQuery = useQueryClient()
    const query = useMutation({

        mutationFn: async () => {

            return archivedNote(id)

        },
        onSuccess: () => {
            invalidateQuery.invalidateQueries({ queryKey: ["getNotes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["notes-archived"] })
            invalidateQuery.invalidateQueries({ queryKey: ["all-notes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["tags"] })
            toast.success("Note archived successfully")
        },
        onError: () => {
            toast.error("Error archiving note")
        }
    })

    return (
        query
    )
}
