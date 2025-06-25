import { Head, Link, router, usePage } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Combobox from "@/components/ui/combobox";
import { toast } from "sonner";
import CreateInventoryForm from "./InventoryAddForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function InventoryPage({ inventariss, category_options }) {
    const { props } = usePage()
    const flash = props.flash

    console.log(inventariss)

    const [openCreateInventorySheet, setOpenCreateInventorySheet] = React.useState(false)

    React.useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
        if (flash?.error) {
            toast.error(flash.error)
        }
    }, [flash])

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
                    {
                        props.auth?.user_role !== 'guru' &&
                        <div className="flex gap-4">
                            <CreateInventoryRightSheet
                                categories={category_options?.data}
                                open={openCreateInventorySheet}
                                onOpenChange={setOpenCreateInventorySheet}
                                trigger={(
                                    <Button variant="accentTwo" onClick={() => setOpenCreateInventorySheet(true)}>
                                        Tambah Unit
                                    </Button>
                                )}
                            />
                            <Button
                                variant="primary"
                                onClick={() => router.visit('/categories')}
                            >
                                Kelola Kategori
                            </Button>
                        </div>
                    }
                </div>
                {/* eof-Action-Container */}

                {selectedCategory && (
                    <div className="w-full mb-6">
                        <p className="text-sm text-slate-500">{category_options?.data?.find((c) => c.code == selectedCategory)?.desc}</p>
                    </div>
                )}

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
        <div className="w-full h-full max-w-lg">
            <Link href={`/inventaris/${inventaris?.code}`} className="block h-full">
                <div className="flex flex-col h-full rounded-4xl overflow-hidden bg-white border border-slate-300">

                    {/* Image Container */}
                    <div className="relative aspect-[4/3]">
                        <img
                            src={inventaris?.image_url}
                            alt="Inventaris"
                            className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 py-1.5 px-3 text-sm bg-itxPrimary-500 text-itxSurface">
                            {`#${inventaris.code}`}
                        </Badge>
                    </div>

                    {/* Information Container */}
                    <div className="flex flex-col gap-4 p-6 border-t border-slate-300 flex-1">
                        <Badge className="py-1.5 px-3 text-sm text-slate-500 bg-slate-200 w-fit">
                            {inventaris?.category?.name}
                        </Badge>

                        <h4 className="text-xl font-semibold text-slate-800">
                            {inventaris?.name}
                        </h4>

                        <p className="text-sm text-slate-500 line-clamp-2">
                            {inventaris?.desc}
                        </p>

                        {/* Push summary to bottom */}
                        <div className="mt-auto">
                            <div className="grid grid-cols-3 text-center text-sm border-t border-slate-300">
                                <div className="py-4 text-itxAccentTwo-500">
                                    <p className="font-semibold text-lg">{inventaris?.summary?.count_tersedia ?? 0}</p>
                                    <p>Tersedia</p>
                                </div>
                                <div className="py-4 text-itxAccentOne-500">
                                    <p className="font-semibold text-lg">{inventaris?.summary?.count_terpinjam ?? 0}</p>
                                    <p>Terpinjam</p>
                                </div>
                                <div className="py-4 text-itxPrimary-500">
                                    <p className="font-semibold text-lg">{inventaris?.summary?.count_tiada ?? 0}</p>
                                    <p>Tiada</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    );
}


function CreateInventoryRightSheet({
    trigger,
    categories,
    open,
    onOpenChange,
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Tambah Barang</SheetTitle>
                    <SheetDescription>
                        Isi form dibawah ini untuk menambahkan data barang
                    </SheetDescription>
                </SheetHeader>
                <CreateInventoryForm
                    categories={categories}
                    onClose={onOpenChange}
                />
            </SheetContent>
        </Sheet>
    )
}