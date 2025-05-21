import { useEffect } from 'react'
import Main from '../shared/Main'
import NavSettings from '../shared/NavSettings'
import ComplementGrid from '../ComplementGrid'
import { useForm } from 'react-hook-form'
import useUpdateUser from '../../hooks/Notes/useUpdateUser'

export default function ChangePassword() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const updatePasswordQuery = useUpdateUser()



    async function onSubmit(data: any) {
        const { newPassword, repeatPassword } = data

        if (newPassword !== repeatPassword) {
            return alert("Passwords do not match")
        }


        const newPasswordResponse = await updatePasswordQuery.mutateAsync(newPassword)

        if (newPasswordResponse) {
            reset()
            alert("Password updated successfully")
            return
        }


    }




    return (
        <>
            <NavSettings />
            <Main>
                <h1 className="text-[24px] text-custom-neutral-950 dark:text-white font-semibold my-4">Change Password</h1>

                <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                    <div>
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
                            })} />
                        {errors.newPassword?.message && <p className="text-red-500 text-sm">{String(errors.newPassword?.message)}</p>}
                    </div>



                    <div>
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
                            })} />
                        {errors.repeatPassword?.message && <p className="text-red-500 text-sm">{String(errors.repeatPassword?.message)}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={updatePasswordQuery.isPending}
                        className="w-[132px] block bg-custom-blue-500 text-white  rounded-custom-8 p-2 mt-4 ml-auto disabled:opacity-50 disabled:cursor-not-allowed">
                        Save Password
                    </button>
                </form>
            </Main>
            <ComplementGrid />
        </>
    )
}
