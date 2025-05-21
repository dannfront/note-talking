import { useQuery } from "@tanstack/react-query"
import { getAllNotes } from "../../supabase/notes"

export default function useGetAllNotes() {

    const query = useQuery({
        queryKey: ["all-notes"],
        queryFn: getAllNotes,
    })

    return (
        query
    )
}
