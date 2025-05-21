import { useMutation } from "@tanstack/react-query"
import { signUp } from "../../supabase/users"

export default function useSignUp() {

    const query = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            return await signUp(email, password)
        }
    })

    return (
        query
    )
}
