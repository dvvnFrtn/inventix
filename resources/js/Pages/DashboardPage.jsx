import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Table from "@/components/ui/table";
import DashboardLayout from "./DashboardLayout";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function DashboardPage({ stat, transaction_history }) {
    const { props } = usePage()
    const flash = props?.flash
    const transactions = transaction_history?.data

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formatted = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
        }).format(date)

        return formatted
    }

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
        if (flash?.error) {
            toast.error(flash.error)
        }
    }, [flash])

    return (
        <>
            <Head title="Inventix - Dashboard" />
            <DashboardLayout title={'Dashboard'}>
                <div className="flex flex-col h-min mb-14 w-full">
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
                {props?.auth?.user_role !== 'petugas' &&
                    <Table
                        toolbar={
                            <div className="flex w-full items-center justify-between">
                                <h4 className="text-xl text-slate-800 font-medium">Riwayat Peminjaman</h4>
                                <Button variant={'secondary'} onClick={() => router.visit('/transactions')}>Selengkapnya</Button>
                            </div>
                        }
                    >
                        <thead className="bg-slate-100 text-left text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Kode</th>
                                <th className="px-6 py-4 font-medium">Peminjam</th>
                                <th className="px-6 py-4 font-medium">Barang Dipinjam</th>
                                <th className="px-6 py-4 font-medium text-center">Tgl Mulai</th>
                                <th className="px-6 py-4 font-medium text-center">Tgl Selesai</th>
                                <th className="px-6 py-4 font-medium text-center">Dikembalikan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.length > 0
                                ? (
                                    transactions?.map((tx) => (
                                        <tr key={tx?.id} className="border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors">
                                            <td className="px-6 py-4">
                                                <Link href={`/transactions/${tx?.code}`} className="text-itxAccentTwo-500 hover:underline">
                                                    {`#${tx?.code}`}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <h6 className="font-medium text-slate-800">{tx?.user?.fullname}</h6>
                                                    <p className="text-sm text-itxAccentOne-500">{tx?.user?.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <h6 className="font-medium text-slate-800">{tx?.unit?.inventaris?.name}</h6>
                                                    <p className="text-sm text-slate-500">
                                                        {
                                                            tx?.unit?.label || 'Tidak berlabel'
                                                        }
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">{formatDate(tx?.start)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className=" flex flex-col justify-center items-center">
                                                    {formatDate(tx?.end)}
                                                    {tx?.late_message && (<p className="text-rose-400 text-sm">{tx?.late_message}</p>)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {
                                                    tx?.updated_at !== tx?.created_at
                                                        ? formatDate(tx?.updated_at)
                                                        : '--'
                                                }
                                            </td>
                                        </tr>
                                    )))
                                : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-slate-400">
                                            Tidak ada data ditemukan.
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                }
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