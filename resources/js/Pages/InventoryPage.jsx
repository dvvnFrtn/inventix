import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/combobox";
import RightSheet from "@/components/ui/right-sheet";
import InventoryAddForm from "./InventoryAddForm";

export default function InventoryPage({ inventariss, category_options }) {
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const inventories = inventariss?.data
    const categories = category_options?.data?.map(c => ({ value: String(c.code), label: c.name }))

    const handleCategoryChange = (val) => {
        setSelectedCategory(val)

        router.get('/inventaris', {
            category: val !== '' ? Number(val) : undefined
        }, {
            replace: true,
            preserveState: true,
            preserveScroll: true
        })
    }

    return (
        <>
            <Head title="Inventix - Inventaris" />
            <DashboardLayout
                title={'Inventaris'}
                description={'Kelola data barang yang tersedia beserta kategori dan unit di sini'}
            >

                {/* sof-Action-Container */}
                <div className="flex flex-row items-center justify-between mb-6 mt-12">
                    <div className="flex flex-row gap-4">
                        <Combobox
                            buttonLabel={'Kategori'}
                            data={categories}
                            emptyMessage={'Kategori tidak ada'}
                            onChange={handleCategoryChange}
                            placeholder={'Cari kategori...'}
                            value={selectedCategory}
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
                    {inventories?.map((inventaris) => (
                        <InventoryCard
                            key={inventaris?.id}
                            inventaris={inventaris}
                        />
                    ))}
                </div>
                {/* eof-Grid-Container */}

            </DashboardLayout>
        </>
    )
}

function InventoryCard({ inventaris }) {
    return (
        <Link href={`/inventaris/${inventaris?.code}`}>
            <div className="w-full max-w-lg rounded-4xl overflow-hidden bg-white border border-slate-300 cursor-pointer">

                {/* sof-Image-Container */}
                <div className="relative">
                    <img
                        src="https://down-id.img.susercontent.com/file/dc0bd15ebc2c4bd249e163c1174a233e"
                        alt="Inventaris"
                        className="w-full h-52 object-cover"
                    />
                    <Badge className="absolute top-6 right-6  py-2 px-4 text-base bg-itxPrimary-500 text-itxSurface">
                        {`#${inventaris.code}`}
                    </Badge>
                </div>
                {/* eof-Image-Container */}

                {/* sof-Information-Container */}
                <div className="flex flex-col gap-4 p-6 border-t border-slate-300">
                    <Badge className="py-2 px-4 text-base text-slate-500 bg-slate-200">
                        {inventaris?.category?.name}
                    </Badge>
                    <h4 className="text-2xl font-medium text-slate-800">
                        {inventaris?.name}
                    </h4>
                    <div>
                        <p className="text-base text-slate-400 truncate">
                            {inventaris?.desc}
                        </p>
                    </div>
                </div>
                {/* eof-Information-Container */}

                {/* sof-Summary-Container */}
                <div className="grid grid-cols-3 text-center text-sm border-t border-slate-300">
                    <div className="py-6 text-itxAccentTwo-500">
                        <p className="font-medium text-lg">{inventaris?.summary?.count_tersedia}</p>
                        <p className="font-base">Tersedia</p>
                    </div>
                    <div className="py-6 text-itxAccentOne-500">
                        <p className="font-medium text-lg">{inventaris?.summary?.count_terpinjam}</p>
                        <p className="font-base">Terpinjam</p>
                    </div>
                    <div className="py-6 text-itxPrimary-500">
                        <p className="font-medium text-lg">{inventaris?.summary?.count_tiada}</p>
                        <p className="font-base">Tiada</p>
                    </div>
                </div>
                {/* eof-Summary-Container */}

            </div>
        </Link>
    )
}