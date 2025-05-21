
import { useForm } from "react-hook-form";
import IconShowPassword from "../../assets/icons/icon-show-password.svg?react"
import { Link, useNavigate } from "react-router";
import useInvalidateQuerys from "../../hooks/Notes/useInvalidateQuerys";
import toast from "react-hot-toast";
import useShowPassword from "../../hooks/useShowPassword";
import useSignIn from "../../hooks/auth/useSignIn";
import useSignUp from "../../hooks/auth/useSignUp";

interface Props {
    isRegister?: boolean;
}


export default function Form({ isRegister }: Props) {

    const { showPassword, passwordRef } = useShowPassword()

    const querySignIn = useSignIn()
    const querySignUp = useSignUp()

    const { handleSubmit, register, formState: { errors }, reset
    } = useForm();

    const invalidateQuerys = useInvalidateQuerys()

    const navigate = useNavigate()


    async function onSubmit(data: any) {
        reset()
        if (isRegister) {
            const { email, password } = data;
            const register = await querySignUp.mutateAsync(email, password)

            if (register === null) {
                return toast.error("Error creating account")
            }

            invalidateQuerys()

            return await navigate("/notes", { viewTransition: true })
        }

        const { email, password } = data;

        const user = await querySignIn.mutateAsync({ email, password })

        if (user === null) {
            return toast.error("Invalid email or password")
        }


        invalidateQuerys()
        toast.success("login success")

        return await navigate("/notes", { viewTransition: true })
    }



    return (
        <>
            <form className="space-y-10 " action="POST" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label className="block dark:text-white text-custom-neutral-950  text-base" htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        placeholder="email@example.com"
                        id="email"
                        className=" w-full text-custom-neutral-500   dark:text-custom-neutral-600  border 
                        border-custom-neutral-300 dark:border-custom-neutral-600  rounded-custom-8 p-2"
                        {...register("email", {
                            required: "email is required",
                            validate: (value) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                return emailRegex.test(value) || "Invalid email address";
                            }
                        })}
                    />
                    {errors.email?.message && <p className="text-red-500 text-sm">{String(errors.email?.message)}</p>}
                </div>

                <div className="relative">
                    <label className="block dark:text-white text-custom-neutral-950 text-base" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className=" w-full text-custom-neutral-500   dark:text-custom-neutral-600  border 
                        border-custom-neutral-300 dark:border-custom-neutral-600  rounded-custom-8 p-2"
                        {...register("password", {
                            required: true,
                            minLength: 8
                        })}
                        ref={e => {
                            passwordRef.current = e;

                            register("password").ref(e);
                        }}
                    />
                    {errors.password?.type === "required" && <p className="text-red-500 text-sm">Password is required</p>}

                    <button type="button" className="cursor-pointer absolute top-[33px] right-2"
                        onClick={showPassword}>
                        <IconShowPassword className="dark:text-custom-neutral-500" />
                    </button>
                    {isRegister && <p className="text-[12px] text-custom-neutral-600 dark:text-custom-neutral-400">At least 8 characters</p>}

                </div>


                <button
                    type="submit"
                    className="cursor-pointer w-full text-white 
                    bg-custom-blue-500 rounded-custom-8 py-[12px] disabled:bg-custom-neutral-300 
                    hover:bg-custom-blue-600 transition-colors duration-200"
                    disabled={querySignIn.isPending || querySignUp.isPending}>
                    {isRegister ? "Create Account" : "Login"}
                </button>

            </form>

            <section className="border-t border-custom-neutral-200 dark:border-custom-neutral-800 mt-5">
                <Link to={isRegister ? "/login" : "/register"} className="text-custom-blue-500 text-base font-semibold mt-5">
                    <p className="text-center text-custom-neutral-500 dark:text-custom-neutral-400 mt-5">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}
                    </p>
                </Link>
            </section>
        </>
    )
}
