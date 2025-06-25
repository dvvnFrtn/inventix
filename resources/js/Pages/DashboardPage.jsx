import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import DashboardLayout from "./DashboardLayout";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function DashboardPage({ stat }) {
    const { props } = usePage()
    console.log(stat)

    return (
        <>
            <Head title="Inventix - Dashboard" />
            <DashboardLayout title={'Dashboard'}>
                <div className="flex flex-col h-full w-full">
                    {props?.auth?.user_role !== 'guru' && <MonthPickerForm />}
                    <div className="flex h-40 flex-row gap-6 mt-14">
                        <div className="flex flex-1 bg-white rounded-3xl border border-slate-300 overflow-hidden">
                            <div className="bg-itxPrimary-500 w-14 h-full">
                            </div>
                            <div className="ml-6 flex flex-col items-start justify-center gap-2">
                                <h3 className="text-7xl text-slate-800 font-medium">{stat?.total}</h3>
                                <p className="text-sm text-slate-500">Total peminjaman</p>
                            </div>
                        </div>
                        <div className="flex flex-1 bg-white rounded-3xl border border-slate-300 overflow-hidden">
                            <div className="bg-itxAccentOne-500 w-14 h-full">
                            </div>
                            <div className="ml-6 flex flex-col items-start justify-center gap-2">
                                <h3 className="text-7xl text-slate-800 font-medium">{stat?.dipinjam}</h3>
                                <p className="text-sm text-slate-500">Total peminjaman aktif</p>
                            </div>
                        </div>
                        <div className="flex flex-1 bg-white rounded-3xl border border-slate-300 overflow-hidden">
                            <div className="bg-itxAccentTwo-500 w-14 h-full">
                            </div>
                            <div className="ml-6 flex flex-col items-start justify-center gap-2">
                                <h3 className="text-7xl text-slate-800 font-medium">{stat?.terlambat}</h3>
                                <p className="text-sm text-slate-500">Total peminjaman terlambat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

const DownloadSchema = z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/, {
        message: 'Format bulan tidak valid (YYYY-MM)',
    }),
})

function MonthPickerForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(DownloadSchema),
    })

    const onSubmit = (data) => {
        const url = `/download-laporan?month=${encodeURIComponent(data.month)}`
        window.location.href = url
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
            <div className="flex items-end gap-4">
                {/* Input bulan */}
                <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Pilih Bulan</label>
                    <input
                        type="month"
                        {...register('month')}
                        className="border bg-slate-50 border-slate-300 rounded-xl px-4 py-2 w-full focus:border-itxAccentOne-500 h-14 focus:ring-itxAccentOne-500"
                    />
                    {errors.month && (
                        <p className="text-sm text-red-500 mt-1">{errors.month.message}</p>
                    )}
                </div>

                {/* Tombol submit */}
                <div className="pt-[1.75rem]">
                    <Button type="submit">Unduh Laporan</Button>
                </div>
            </div>
        </form>)
}