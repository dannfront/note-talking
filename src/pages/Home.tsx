
import { useEffect } from "react";
import Nav from "../components/shared/Nav";

import { Outlet, useNavigate } from "react-router";


export default function Home() {


    const navigate = useNavigate()

    useEffect(() => {
        navigate("/notes", { replace: true, viewTransition: true })
    }, [navigate])


    return (
        <>

            {/* menu mobil */}
            <Nav />

            {/* contenido principal */}
            <Outlet />

        </>
    )
}
