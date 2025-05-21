import { ReactNode } from "react"
import IconLogo from "../assets/icons/logo.svg?react"
import { useLocation } from "react-router";

interface Props {
    children: ReactNode;
}




export default function AuthLayout({ children }: Props) {

    const [route] = useLocation().pathname.split("/").slice(1);
    console.log(route);


    return (
        <div className="h-screen flex justify-center items-center">

            <main className="w-[540px] max-w-[90%]   bg-white dark:bg-custom-neutral-950 
        p-10 rounded-custom-16 content-center">
                <header className="w-fit mx-auto text-center space-y-1">

                    <IconLogo className="fill-blue-500 dark:fill-white mx-auto" />

                    <h1 className="text-custom-neutral-950 dark:text-white font-bold text-2xl">
                        {
                            route === "register" ? "Create Your Account" : "Welcome To Note"
                        }

                    </h1>
                    <h2 className="text-custom-neutral-950 dark:text-white text-sm mb-10">

                        {route === "register" ? "Sign up to start organizing your notes and boost your productivity." : "Please log in to continue"}

                    </h2>
                </header>

                {children}

            </main>
        </div>
    )
}
