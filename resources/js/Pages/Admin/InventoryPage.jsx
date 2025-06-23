import { Head } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/combobox";
import RightSheet from "@/components/ui/right-sheet";
import InventoryAddForm from "./InventoryAddForm";

export default function InventoryPage() {
    const categories = [
        {
            value: "0001",
            label: "Category 1",
        },
        {
            value: "0002",
            label: "Category 2",
        },
        {
            value: "0003",
            label: "Category 3",
        },
        {
            value: "0004",
            label: "Category 4",
        }
    ]
    const [value, setValue] = React.useState("")

    return (
        <>
            <Head title="Inventix - Inventories" />
            <DashboardLayout
                title={'Daftar Barang'}
                description={'Kelola data barang yang tersedia beserta kategori dan satuannya di sini'}
            >

                {/* sof-Action-Container */}
                <div className="flex flex-row items-center justify-between mb-6 mt-12">
                    <div className="flex flex-row gap-4">
                        <Combobox
                            buttonLabel={'Kategori'}
                            data={categories}
                            emptyMessage={'Kategori tidak ada'}
                            onChange={setValue}
                            placeholder={'Cari kategori...'}
                            value={value}
                        />

                        <Input placeholder='Cari barang disini...' />
                    </div>
                    <RightSheet
                        triggerLabel={'Tambah Barang'}
                        triggerVariant={'accentTwo'}
                        sheetTitle={'Tambah Barang'}
                        sheetDescription={'Isi form dibawah ini untuk menambahkan data barang'}
                    >
                        <InventoryAddForm />
                    </RightSheet>
                </div>
                {/* eof-Action-Container */}

                {/* sof-Grid-Container */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <InventoryCard key={i} />
                    ))}
                </div>
                {/* eof-Grid-Container */}

            </DashboardLayout>
        </>
    )
}

function InventoryCard() {
    return (
        /* sof-Container */
        <div className="w-full max-w-lg rounded-4xl overflow-hidden bg-white border border-slate-300 cursor-pointer">

            {/* sof-Image-Container */}
            <div className="relative">
                <img
                    src="https://down-id.img.susercontent.com/file/dc0bd15ebc2c4bd249e163c1174a233e"
                    alt="Inventaris"
                    className="w-full h-52 object-cover"
                />
                <Badge className="absolute top-6 right-6  py-2 px-4 text-base bg-itxPrimary-500 text-itxSurface">
                    #654
                </Badge>
            </div>
            {/* eof-Image-Container */}

            {/* sof-Information-Container */}
            <div className="flex flex-col gap-4 p-6 border-t border-slate-300">
                <Badge className="py-2 px-4 text-base text-slate-500 bg-slate-200">
                    Category1
                </Badge>
                <h4 className="text-3xl font-medium text-slate-800">Sapu</h4>
                <div >
                    <p className="text-base text-slate-400 truncate">
                        Lorem ipsum dolor sit amet bla bla sepeludhsafhdf Lorem ipsum dolor sit amet bla bla sepeludhsafhdf
                    </p>
                </div>
            </div>
            {/* eof-Information-Container */}

            {/* sof-Summary-Container */}
            <div className="grid grid-cols-3 text-center text-sm border-t border-slate-300">
                <div className="py-6 text-itxAccentTwo-500">
                    <p className="font-medium text-lg">289</p>
                    <p className="font-base">Tersedia</p>
                </div>
                <div className="py-6 text-itxAccentOne-500">
                    <p className="font-medium text-lg">0</p>
                    <p className="font-base">Dipinjam</p>
                </div>
                <div className="py-6 text-itxPrimary-500">
                    <p className="font-medium text-lg">0</p>
                    <p className="font-base">Tiada</p>
                </div>
            </div>
            {/* eof-Summary-Container */}

        </div>
    )
}

export { InventoryCard };