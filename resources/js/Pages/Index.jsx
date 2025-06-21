import React from 'react'
import { Head } from '@inertiajs/react'

export default function Index(props) {
    return (
        <>
            <Head title="Hello Page" />
            <div>
                <h1 className='text-3xl text-red-500'>Hello, Inertia + React + Laravel! 👋</h1>
                <p>Ini halaman test yang berhasil dirender dari React.</p>
                <p>Pesan dari server: <strong>{props.message}</strong></p>
            </div>
        </>
    )
}