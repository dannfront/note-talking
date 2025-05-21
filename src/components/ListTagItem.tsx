
import useGetTags from "../hooks/Notes/useGetTags";
import TagItem from "./TagItem";

interface Props {
    isMobil?: boolean
}

export default function ListTagItem({ isMobil = false }: Props) {

    const query = useGetTags()

    const tags = query.data || []

    return (
        <ul className='overflow-y-auto no-scrollbar space-y-3'>
            {
                tags.map(tag => <TagItem tag={tag} key={tag} isMobil={isMobil} />)
            }
        </ul>
    )
}
