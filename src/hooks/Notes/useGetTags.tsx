import { useQuery } from "@tanstack/react-query"
import { getTags } from "../../supabase/tags"

export default function useGetTags() {

    const query = useQuery({
        queryKey: ["tags"],
        queryFn: () => getTags(),
    })


    return query
}
