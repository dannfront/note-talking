import { useQuery } from "@tanstack/react-query"
import { getNotes } from "../../supabase/notes"

export default function useGetNotes() {


    const query = useQuery({
        queryKey: ["getNotes"],
        queryFn: async () => {
            return await getNotes()
        }

    })

    return (
        query
    )
}
