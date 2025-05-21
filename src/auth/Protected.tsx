import { ReactNode, useEffect, useState } from "react";
import supabase from "../lib/supabase/supabaseClient";
import { useNavigate } from "react-router";
import AllNotesLoader from "../components/loaders/AllNotesLoader";


interface Props {
    children: ReactNode;
}


export default function Protected({ children }: Props) {

    const [user, setUser] = useState<boolean | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    useEffect(() => {
        async function getUser() {
            setLoading(true);
            const { data, error } = await supabase.auth.getSession();


            if (error || !data?.session) {
                setUser(false);
            } else {

                setUser(true);
            }
            setLoading(false);
        }
        getUser();
    }, []);

    useEffect(() => {
        if (user === false && !loading) {
            navigate("/login", { replace: true });
        }
    }, [user, loading, navigate]);


    if (loading || user === null) {
        return (
            <AllNotesLoader />
        )
    }

    return (
        <>{children}</>
    )
}
