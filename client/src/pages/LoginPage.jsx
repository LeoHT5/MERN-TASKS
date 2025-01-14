/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { signin, errors: loginErrors, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        signin(data)
    })

    useEffect(() => {
        if (isAuthenticated) { navigate('/tasks') }
    }, [isAuthenticated])

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    loginErrors.map((error, i) =>
                    (
                        <div className='bg-red-500 text-white text-center p-2 my-2 rounded-md' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl text-white text-center mb-4 font-bold'>Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {...register('email', { required: true })} placeholder='Email'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {errors.email && (
                        <span className='text-red-500'>Email is required</span>
                    )}

                    <input type="password" {...register('password', { required: true })} placeholder='Password'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {errors.password && (
                        <span className='text-red-500 block'>Password is required</span>
                    )}

                    <button type="submit" className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'> Login </button>
                </form>
                <p className="flex gap-x-2 items-center justify-center mt-4">
                    Don't have an account? <Link to='/register' className="text-blue-500">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage