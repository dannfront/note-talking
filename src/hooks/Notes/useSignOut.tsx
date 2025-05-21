
import { signOut } from '../../supabase/users'
import { useMutation } from '@tanstack/react-query'

export default function useSignOut() {
    const query = useMutation({
        mutationFn: async () => {
            return await signOut()
        }
    })
    return (
        query
    )
}
