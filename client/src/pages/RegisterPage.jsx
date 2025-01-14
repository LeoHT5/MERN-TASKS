/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) { navigate('/tasks') }
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    registerErrors.map((error, i) =>
                    (
                        <div className='bg-red-500 text-white text-center p-2 my-2 rounded-md' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl text-white text-center mb-4 font-bold'>Register</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register('username', { required: true })} placeholder='Username'
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
                    {errors.username && (
                        <span className='text-red-500'>Username is required</span>
                    )}

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

                    <button type="submit" className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'> Register </button>
                </form>
                <p className="flex gap-x-2 items-center justify-center mt-4">
                    Already have an account? <Link to='/login' className="text-blue-500">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage