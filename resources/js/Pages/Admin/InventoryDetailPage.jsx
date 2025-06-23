import { Head } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import Combobox from "@/components/ui/combobox";
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CreateInventoryUnitForm from "./CreateIventoryUnitForm";
import UpdateInventoryUnitForm from "./UpdateInventoryUnitForm";
import CreateTransactionForm from "./CreateTransactionForm";
import { Badge } from "@/components/ui/badge";

const dummy_statuses = [
    {
        value: '0001',
        label: 'Tersedia'
    },
    {
        value: '0002',
        label: 'Tiada'
    },
    {
        value: '0003',
        label: 'Terpinjam'
    }
]

const dummy_conditions = [
    {
        value: '0001',
        label: 'Bagus'
    },
    {
        value: '0002',
        label: 'Agak cacat'
    },
    {
        value: '0003',
        label: 'Cacat'
    }
]

const dummy_inventory = {
    id: 'ab0026489',
    code: 634,
    name: 'Sapu',
    desc: 'Lorem ipsum dolor sit amet amit zbyangyik enumeration nihao',
    category: 'Kebersihan',
    created_at: Date.now(),
    updated_at: Date.now(),
    count_tersedia: 45,
    count_dipinjam: 19,
    count_tiada: 2
}

const dummy_units = [
    {
        id: 'a0009',
        code: 63401,
        label: 'Sapu Unit 1',
        desc: 'Lorem ipsum dolor sit amet amit zbyangyik enumeration nihao',
        status: 'tersedia',
        condition: 'sangat baik',
    },
    {
        id: 'a0010',
        code: 63402,
        label: 'Sapu Unit 2',
        desc: 'Lorem ipsum dolor sit amet amit zbyangyik enumeration nihao',
        status: 'dipinjam',
        condition: 'baik',
    },
    {
        id: 'a0011',
        code: 63403,
        label: 'Sapu Unit 3',
        desc: 'Lorem ipsum dolor sit amet amit zbyangyik enumeration nihao',
        status: 'dipinjam',
        condition: 'baik',
    }
]

export default function IventoryDetailPage({ inventaris }) {
    // Filtering-State
    const [selectedStatus, setSelectedStatus] = React.useState('')
    const [selectedCondition, setSelectedCondition] = React.useState('')
    const [selectedUnit, setSelectedUnit] = React.useState(null)

    // Dialog-State
    const [openDeleteUnitDialog, setOpenDeleteUnitDialog] = React.useState(false)
    const [openDeleteInventoryDialog, setOpenDeleteInventoryDialog] = React.useState(false)

    // Data-State
    const [units, setUnits] = React.useState(dummy_units)
    const [inventory, setInventory] = React.useState(dummy_inventory)
    const [statuses, setStatuses] = React.useState(dummy_statuses)
    const [conditions, setConditions] = React.useState(dummy_conditions)

    return (
        <>
            <Head title="Inventix - Detail Barang" />
            <DashboardLayout
                title={'Detail Barang'}
                description={'Berikut informasi detail dan unit dari barang'}
            >
                <div className="flex w-full gap-6">
                    <InventoryDetailCard
                        inventory={inventory}
                        onDelete={() => setOpenDeleteInventoryDialog(true)}
                    />
                    <Table
                        toolbar={
                            <div className="flex gap-2 w-full justify-between">
                                <div className="flex gap-4">
                                    <Combobox
                                        buttonLabel={'Status'}
                                        emptyMessage={'Status tidak ada'}
                                        placeholder={'Cari status...'}
                                        data={statuses}
                                        value={selectedStatus}
                                        onChange={setSelectedStatus}
                                        width='w-[150px]'
                                    />
                                    <Combobox
                                        buttonLabel={'Kondisi'}
                                        emptyMessage={'Kondisi tidak ada'}
                                        placeholder={'Cari kondisi...'}
                                        data={conditions}
                                        value={selectedCondition}
                                        onChange={setSelectedCondition}
                                        width='w-[150px]'
                                    />
                                    <Input placeholder="Cari unit..." />
                                </div>
                                <CreateInventoryUnitRightSheet
                                    trigger={(
                                        <Button variant="accentTwo">
                                            Tambah Unit
                                        </Button>
                                    )}
                                />
                            </div>
                        }
                    >
                        <thead className="bg-slate-100 text-left text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Kode</th>
                                <th className="px-6 py-4 font-medium min-w-[250px]">Label</th>
                                <th className="px-6 py-4 font-medium">Kondisi</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 text-right font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.map((unit) => (
                                <tr key={unit.id} className="border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors">
                                    <td className="px-6 py-4">{`#${unit.code}`}</td>
                                    <td className="px-6 py-4">{unit.label}</td>
                                    <td className="px-6 py-4">{unit.condition}</td>
                                    <td className="px-6 py-4">{unit.status}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <UpdateInventoryUnitRightSheet
                                                updatedUnit={unit}
                                                trigger={(
                                                    <Button
                                                        size="sm"
                                                        variant="accentOne"
                                                    >
                                                        <Edit />
                                                    </Button>
                                                )}
                                            />
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => {
                                                    setSelectedUnit(unit)
                                                    setOpenDeleteUnitDialog(true)
                                                }}
                                            >
                                                <Trash2 />
                                            </Button>
                                            <CreateTransactionRightSheet
                                                selectedUnit={unit}
                                                trigger={(
                                                    <Button size="sm" variant="primary">
                                                        Pinjamkan
                                                    </Button>
                                                )}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <DeleteUnitAlertDialog
                        open={openDeleteUnitDialog}
                        onOpenChange={setOpenDeleteUnitDialog}
                        deletedUnit={selectedUnit}
                    />
                    <DeleteInventoryAlertDialog
                        open={openDeleteInventoryDialog}
                        onOpenChange={setOpenDeleteInventoryDialog}
                        deletedInventory={inventory}
                    />
                </div>
            </DashboardLayout>
        </>
    )
}

function InventoryDetailCard({
    inventory,
    onDelete
}) {
    return (
        /* sof-Container */
        <div className="w-full max-w-md rounded-4xl overflow-hidden bg-white border border-slate-300 cursor-pointer">

            {/* sof-Image-Container */}
            <div className="relative">
                <img
                    src="https://down-id.img.susercontent.com/file/dc0bd15ebc2c4bd249e163c1174a233e"
                    alt="Inventaris"
                    className="h-auto w-full object-cover"
                />
                <Badge className="absolute top-6 right-6  py-2 px-4 text-base bg-itxPrimary-500 text-itxSurface">
                    {`#${inventory?.code}`}
                </Badge>
            </div>
            {/* eof-Image-Container */}

            {/* sof-Information-Container */}
            <div className="flex flex-col gap-4 p-6 border-t border-slate-300">
                <Badge className="py-2 px-4 text-base text-slate-500 bg-slate-200">
                    {inventory?.category}
                </Badge>
                <h4 className="text-3xl font-medium text-slate-800">{inventory?.name}</h4>
                <div >
                    <p className="text-base text-slate-400 truncate">
                        {inventory?.desc}
                    </p>
                </div>
            </div>
            {/* eof-Information-Container */}

            {/* sof-Summary-Container */}
            <div className="grid grid-cols-3 text-center text-sm border-t border-slate-300">
                <div className="py-6 text-itxAccentTwo-500">
                    <p className="font-medium text-lg">{inventory?.count_tersedia}</p>
                    <p className="font-base">Tersedia</p>
                </div>
                <div className="py-6 text-itxAccentOne-500">
                    <p className="font-medium text-lg">{inventory?.count_dipinjam}</p>
                    <p className="font-base">Dipinjam</p>
                </div>
                <div className="py-6 text-itxPrimary-500">
                    <p className="font-medium text-lg">{inventory?.count_tiada}</p>
                    <p className="font-base">Tiada</p>
                </div>
            </div>
            {/* eof-Summary-Container */}

            <div className="flex gap-2 p-6 items-center justify-center">
                <Button variant={'accentOne'} className={'flex-1'}>Edit</Button>
                <Button
                    variant={'destructive'}
                    className={'flex-1'}
                    onClick={onDelete}
                >
                    Hapus
                </Button>
            </div>
        </div>
    )
}

function DeleteInventoryAlertDialog({
    open,
    onOpenChange,
    deletedInventory
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Hapus Barang
                    </DialogTitle>
                    <DialogDescription>
                        {`Apakah anda yakin ingin menghapus barang ${deletedInventory?.code}?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'} >Batal</Button>
                    </DialogClose>
                    <Button variant={'destructive'}>Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function DeleteUnitAlertDialog({
    open,
    onOpenChange,
    deletedUnit
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Hapus Unit
                    </DialogTitle>
                    <DialogDescription>
                        {`Apakah anda yakin ingin menghapus unit barang ${deletedUnit?.code}?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'} >Batal</Button>
                    </DialogClose>
                    <Button variant={'destructive'}>Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function CreateInventoryUnitRightSheet({
    trigger
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Tambah Unit</SheetTitle>
                    <SheetDescription>
                        Isi form dibawah ini untuk menambahkan data unit
                    </SheetDescription>
                </SheetHeader>
                <CreateInventoryUnitForm />
            </SheetContent>
        </Sheet>
    )
}

function UpdateInventoryUnitRightSheet({
    trigger,
    updatedUnit
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Unit</SheetTitle>
                    <SheetDescription>
                        Isi form dibawah ini untuk memperbarui data unit
                    </SheetDescription>
                </SheetHeader>
                <UpdateInventoryUnitForm updatedUnit={updatedUnit} />
            </SheetContent>
        </Sheet>
    )
}

function CreateTransactionRightSheet({
    trigger,
    selectedUnit
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Buat Peminjaman</SheetTitle>
                    <SheetDescription>
                        Isi form dibawah ini untuk membuat data peminjaman
                    </SheetDescription>
                </SheetHeader>
                <CreateTransactionForm selectedUnit={selectedUnit} />
            </SheetContent>
        </Sheet>
    )
}