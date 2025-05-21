import { useRef } from "react";

export default function useShowPassword() {

    const passwordRef = useRef<HTMLInputElement>(null)

    function showPassword() {
        if (!passwordRef.current) return

        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
        } else {
            passwordRef.current.type = "password";
        }

    }
    return {
        showPassword,
        passwordRef
    }
}
