import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import LoginForm from './LoginForm'

export default function AuthPage() {
    return (
        <>
            <Head title='Inventix - Auth' />
            <div className='flex flex-row bg-itxPrimary-500 h-screen p-4'>
                <div className="flex flex-1 justify-center items-center rounded-lg bg-itxSurface">
                    <div className='flex flex-row gap-12 w-fit h-fit'>
                        <img className='size-36' src='assets/img/logo.png' />
                        <div className="flex flex-col gap-6">
                            <p className='text-sm text-slate-500'>Sistem Informasi<br />Pengelolaan Inventaris Sekolah</p>
                            <hr className='border-slate-400' />
                            <h3 className='text-5xl text-slate-800 font-semibold'>Inventix</h3>
                        </div>
                    </div>
                </div>
                <div className="ml-4 flex flex-1 justify-center items-center">
                    <div className='flex flex-col gap-12 w-full max-w-[400px]'>
                        <div className='flex flex-col gap-6'>
                            <h1 className='text-[56px] text-center font-medium text-itxSurface'>Login</h1>
                            <p className='text-slate-300 text-center'>Masuk ke akun anda untuk melanjutkan</p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}