import { useQuery } from "@tanstack/react-query"
import { getNotes } from "../../supabase/notes"


export default function useGetNotesArchived() {

    const query = useQuery({
        queryKey: ["notes-archived"],
        queryFn: () => getNotes(true)
    })

    return (
        query
    )
}
