import { Head, usePage } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import Table from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionPage({ transactions: rawTransactions }) {
    const { props } = usePage()

    const transactions = rawTransactions?.data

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formatted = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)

        return formatted
    }

    return (
        <>
            <Head title="Inventix - Transactions" />
            <DashboardLayout title={'Peminjaman'} description={'Berikut informasi data transaksi peminjaman'}>
                <Table
                    toolbar={<Input placeholder="Cari peminjaman..." />}
                >
                    <thead className="bg-slate-100 text-left text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Kode</th>
                            <th className="px-6 py-4 font-medium">Peminjam</th>
                            <th className="px-6 py-4 font-medium">Unit Dipinjam</th>
                            <th className="px-6 py-4 font-medium">Tgl Pinjam</th>
                            <th className="px-6 py-4 font-medium">Tgl Kembali</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            {
                                props.auth?.user_role !== 'guru' &&
                                <th className="px-6 py-4 text-right font-medium">Aksi</th>
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.length > 0
                            ? (
                                transactions?.map((tx) => (
                                    <tr key={tx?.id} className="border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors">
                                        <td className="px-6 py-4">{`#${tx?.code}`}</td>
                                        <td className="px-6 py-4">{tx?.user?.fullname}</td>
                                        <td className="px-6 py-4">{tx?.unit?.label}</td>
                                        <td className="px-6 py-4">{formatDate(tx?.start)}</td>
                                        <td className="px-6 py-4 flex flex-col">
                                            {formatDate(tx?.end)}
                                            {tx?.late_message && (<p className="text-rose-400 text-sm">{tx?.late_message}</p>)}
                                        </td>
                                        <td className="px-6 py-4">{tx?.status === 0 ? 'Sedang' : 'Selesai'}</td>
                                        {
                                            props.auth?.user_role !== 'guru' &&
                                            <td className="px-6 py-4 text-right">
                                                {tx?.status === 0 && (
                                                    <Button
                                                        size={'sm'}
                                                    >
                                                        Kembalikan
                                                    </Button>
                                                )}
                                            </td>
                                        }
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
            </DashboardLayout >
        </>
    )
}