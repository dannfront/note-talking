import { useMutation } from "@tanstack/react-query"
import { signIn } from "../../supabase/users"


export default function useSignIn() {

    const mutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {


            return await signIn(email, password)
        },
    })

    return mutation
}
