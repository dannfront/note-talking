
import Main from '../shared/Main'
import NavSettings from '../shared/NavSettings'
import ComplementGrid from '../ComplementGrid'
import { useForm } from 'react-hook-form'
import useUpdateUser from '../../hooks/Notes/useUpdateUser'
import useShowPassword from '../../hooks/useShowPassword'
import IconShowPassword from '../../assets/icons/icon-show-password.svg?react'
import useSignOut from '../../hooks/Notes/useSignOut'
import { useNavigate } from 'react-router'

export default function ChangePassword() {

    type ChangePasswordFormData = {
        newPassword: string;
        repeatPassword: string;
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ChangePasswordFormData>()
    const updatePasswordQuery = useUpdateUser()
    const navigate = useNavigate()

    const { showPassword, passwordRef } = useShowPassword()
    const { showPassword: showPassConfirm, passwordRef: passComfirmRef } = useShowPassword()
    const querySignOut = useSignOut()



    async function onSubmit(data: ChangePasswordFormData) {
        const { newPassword, repeatPassword } = data
        if (newPassword !== repeatPassword) {

            return alert("Passwords do not match")
        }


        const newPasswordResponse = await updatePasswordQuery.mutateAsync(newPassword)

        if (newPasswordResponse) {
            reset()
            alert("Password updated successfully")
            await querySignOut.mutateAsync()
            return await navigate("/login", { replace: true, viewTransition: true })
        }


    }




    return (
        <>
            <NavSettings />
            <Main>
                <h1 className="text-[24px] text-custom-neutral-950 dark:text-white font-semibold my-4">Change Password</h1>

                <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>

                    <div className='relative'>
                        <label htmlFor="newPassword"
                            className='text-custom-neutral-950 dark:text-white'>New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="w-full text-custom-neutral-500  dark:text-custom-neutral-600 border border-custom-neutral-600  rounded-custom-8 p-2"
                            {...register("newPassword", {
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                                required: "Password is required",

                            })}

                            ref={e => {
                                passwordRef.current = e;

                                register("newPassword").ref(e);
                            }}
                        />
                        {errors.newPassword?.message && <p className="text-red-500 text-sm">{String(errors.newPassword?.message)}</p>}

                        <button type="button" className="cursor-pointer absolute top-[33px] right-2"
                            onClick={showPassword}>
                            <IconShowPassword className="dark:text-custom-neutral-500" />
                        </button>
                    </div>



                    <div className='relative'>
                        <label htmlFor="repeatPassword"
                            className='text-custom-neutral-950 dark:text-white'>Confirm New Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            className="w-full text-custom-neutral-500  dark:text-custom-neutral-600 border border-custom-neutral-600  rounded-custom-8 p-2"
                            {...register("repeatPassword", {
                                minLength: {
                                    value: 8,
                                    message: "Confirm New Password must be at least 8 characters",
                                },
                                required: "Confirm New Password is required",
                            })}

                            ref={e => {
                                passComfirmRef.current = e;

                                register("repeatPassword").ref(e);
                            }}
                        />
                        {errors.repeatPassword?.message && <p className="text-red-500 text-sm">{String(errors.repeatPassword?.message)}</p>}
                        <button type="button" className="cursor-pointer absolute top-[33px] right-2"
                            onClick={showPassConfirm}>
                            <IconShowPassword className="dark:text-custom-neutral-500" />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={updatePasswordQuery.isPending}
                        className="cursor-pointer w-[132px] block bg-custom-blue-500 text-white  rounded-custom-8 p-2 mt-4 ml-auto disabled:opacity-50 disabled:cursor-not-allowed">
                        Save Password
                    </button>
                </form>
            </Main>
            <ComplementGrid />
        </>
    )
}
