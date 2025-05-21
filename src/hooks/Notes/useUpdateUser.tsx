import { useMutation } from '@tanstack/react-query'
import { updatePassword } from '../../supabase/users'

export default function useUpdateUser() {

    const query = useMutation({
        mutationFn: async (newPassword: string) => {
            return await updatePassword(newPassword)
        }
    })

    return (
        query
    )
}
