import { Head } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Badge } from "@/components/ui/badge";

export default function TransactionPage() {
    return (
        <>
            <Head title="Inventix - Inventories" />
            <DashboardLayout title={'Daftar Barang'}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Ulangi card-nya di sini */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <InventoryCard key={i} />
                    ))}
                </div>
            </DashboardLayout>
        </>
    )
}

function InventoryCard() {
    return (
        <div className="rounded-4xl overflow-hidden bg-white border border-slate-300 w-full max-w-lg">
            <div className="relative">
                <img
                    src="https://down-id.img.susercontent.com/file/dc0bd15ebc2c4bd249e163c1174a233e"
                    alt="Inventaris"
                    className="w-full h-52 object-cover"
                />
                <Badge className="absolute top-6 right-6 text-base bg-itxPrimary-500 text-itxSurface py-2 px-4">
                    # 654
                </Badge>
            </div>

            <div className="p-6 border-t border-slate-300 flex flex-col gap-4">
                <Badge className="text-base text-slate-500 bg-slate-200 py-2 px-4">
                    Category1
                </Badge>
                <h4 className="text-4xl font-medium text-slate-800">Sapu</h4>
                <p className="text-base text-slate-500">
                    Lorem ipsum dolor sit amet bla bla sepeludhsafhdf
                </p>
            </div>

            <div className="grid grid-cols-3 text-center text-sm border-t border-slate-300">
                <div className="py-6 text-itxAccentTwo-500">
                    <p className="font-medium text-lg">289</p>
                    <p className="font-medium">Tersedia</p>
                </div>
                <div className="py-6 text-teal-500">
                    <p className="font-medium text-lg">0</p>
                    <p className="font-medium">Dipinjam</p>
                </div>
                <div className="py-6 text-slate-800">
                    <p className="font-medium text-lg">0</p>
                    <p className="font-medium">Tiada</p>
                </div>
            </div>
        </div>

    )
}