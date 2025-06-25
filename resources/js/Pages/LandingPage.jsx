import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import React from "react";

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-14 items-center justify-center w-full h-screen bg-itxSurface">
            <div className='flex flex-row gap-12 w-fit h-fit'>
                <img className='size-36' src='assets/img/logo.png' />
                <div className="flex flex-col gap-6">
                    <p className='text-sm text-slate-500'>Sistem Informasi<br />Pengelolaan Inventaris Sekolah</p>
                    <hr className='border-slate-400' />
                    <h3 className='text-5xl text-slate-800 font-semibold'>Inventix</h3>
                </div>
            </div>
            <Button className={'w-36'} onClick={() => router.visit('/auth')}>Login</Button>
        </div>
    )
}