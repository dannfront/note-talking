import { useQueryClient } from "@tanstack/react-query"

export default function useInvalidateQuerys() {

    const queryClient = useQueryClient()
    function invalidateQuerys() {
        queryClient.invalidateQueries({ queryKey: ["getNotes"] })
        queryClient.invalidateQueries({ queryKey: ["notes-archived"] })
        queryClient.invalidateQueries({ queryKey: ["all-notes"] })
        queryClient.invalidateQueries({ queryKey: ["tags"] })
    }
    return (
        invalidateQuerys
    )
}
