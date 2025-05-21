import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../supabase/notes"
import toast from "react-hot-toast"


export default function useDeleteNote(id: number) {
    const invalidateQuery = useQueryClient()
    const query = useMutation({

        mutationFn: async () => {

            return deleteNote(id)

        },
        onSuccess: () => {
            invalidateQuery.invalidateQueries({ queryKey: ["getNotes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["notes-archived"] })
            invalidateQuery.invalidateQueries({ queryKey: ["all-notes"] })
            invalidateQuery.invalidateQueries({ queryKey: ["tags"] })
            toast.success("Note deleted successfully")
        },
        onError: () => {
            toast.error("Error deleting note")
        }
    })

    return (
        query
    )
}
