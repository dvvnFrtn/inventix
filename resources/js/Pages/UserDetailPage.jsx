import { Head, router, usePage } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UpdateUserForm from "./UpdateUserForm";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function UserDetailPage({ user: rawUser }) {
    const { props } = usePage()
    const flash = props?.flash
    const user = rawUser?.data
    const transactions = user?.transactions

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formatted = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
        }).format(date)

        return formatted
    }

    const [selectedTx, setSelectedTx] = React.useState(null)
    const [openUpdateUserSheet, setOpenUpdateUserSheet] = React.useState(false)
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = React.useState(false)
    const [openReturnTxDialog, setOpenReturnTxDialog] = React.useState(false)

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
            <Head title="Inventix - Detail User" />
            <DashboardLayout
                title={'Detail User'}
                description={'Berikut informasi detail tentang user'}
            >
                <div className="flex w-full gap-6">
                    <UserDetailCard
                        user={user}
                        onUpdate={() => {
                            setOpenUpdateUserSheet(true)
                        }}
                        onDelete={() => {
                            setOpenDeleteUserDialog(true)
                        }}
                    />
                    <Table
                        toolbar={<Input placeholder="Cari peminjaman..." />}
                    >
                        <thead className="bg-slate-100 text-left text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Kode</th>
                                <th className="px-6 py-4 font-medium">Barang Dipinjam</th>
                                <th className="px-6 py-4 font-medium text-center">Tgl Mulai</th>
                                <th className="px-6 py-4 font-medium text-center">Tgl Selesai</th>
                                <th className="px-6 py-4 font-medium">Dikembalikan</th>
                                <th className="px-6 py-4 text-right font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.length > 0
                                ? (
                                    transactions?.map((tx) => (
                                        <tr key={tx?.id} className="border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors">
                                            <td className="px-6 py-4">{`#${tx?.code}`}</td>
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
                                                <div className="flex flex-col justify-center items-center">
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
                                            {
                                                props.auth?.user_role !== 'guru' &&
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        size={'sm'}
                                                        disabled={tx?.status === 1}
                                                        onClick={() => {
                                                            setSelectedTx(tx)
                                                            setOpenReturnTxDialog(true)
                                                        }}
                                                    >
                                                        {tx?.status === 0 ? 'Kembalikan' : 'Telah Dikembalikan'}
                                                    </Button>
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
                    <UpdateUserRightSheet
                        open={openUpdateUserSheet}
                        onOpenChange={setOpenUpdateUserSheet}
                        updatedUser={user}
                        trigger={(
                            <Button
                                size="sm"
                                variant="accentOne"
                                className={'hidden'}
                                onClick={() => setOpenUpdateUserSheet(true)}
                            >
                                Edit User
                            </Button>
                        )}
                    />
                    <DeleteUserAlertDialog
                        open={openDeleteUserDialog}
                        onOpenChange={setOpenDeleteUserDialog}
                        deletedUser={user}
                        onSucces={() => setOpenDeleteUserDialog(false)}
                    />
                    <ReturnTransactionAlertDialog
                        open={openReturnTxDialog}
                        transaction={selectedTx}
                        onOpenChange={setOpenReturnTxDialog}
                        onSucces={() => setOpenReturnTxDialog(false)}
                    />
                </div>
            </DashboardLayout >
        </>
    )
}

function UserDetailCard({ user, onUpdate, onDelete }) {

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formatted = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)

        return formatted
    }
    return (
        <div className="w-1/3 flex flex-col gap-6 rounded-3xl border border-slate-300 p-6 bg-white">
            <div className="flex flex-col gap-2">
                <h6 className="text-xs font-normal text-slate-500">Nama Lengkap</h6>
                <p className="text-base text-slate-800">{user?.fullname}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="text-xs font-normal text-slate-500">Email</h6>
                <p className="text-base text-itxAccentOne-500">{user?.email}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="text-xs font-normal text-slate-500">Role</h6>
                <p className="text-base text-slate-800">{user?.role}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="text-xs font-normal text-slate-500">Dibuat</h6>
                <p className="text-base text-slate-800">{formatDate(user?.created_at)}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="text-xs font-normal text-slate-500">Diubah</h6>
                <p className="text-base text-slate-800">{formatDate(user?.updated_at)}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 border-t border-slate-300 py-4">
                <Button
                    variant={'accentOne'}
                    className={'flex-1'}
                    onClick={onUpdate}
                >
                    Edit
                </Button>
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

function UpdateUserRightSheet({
    trigger,
    open,
    onOpenChange,
    updatedUser
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                    <SheetDescription>
                        Isi form dibawah ini untuk memperbarui data user
                    </SheetDescription>
                </SheetHeader>
                <UpdateUserForm
                    updatedUser={updatedUser}
                    onClose={onOpenChange}
                />
            </SheetContent>
        </Sheet>
    )
}

function DeleteUserAlertDialog({
    open,
    onOpenChange,
    deletedUser,
    onSucces
}) {
    const handleDelete = () => {
        router.delete(`/users/${deletedUser?.id}`, {
            onSuccess: onSucces,
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Hapus User
                    </DialogTitle>
                    <DialogDescription>
                        {`Apakah anda yakin ingin menghapus user ${deletedUser?.fullname}?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'} >Batal</Button>
                    </DialogClose>
                    <Button variant={'destructive'} onClick={handleDelete}>Hapus</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function ReturnTransactionAlertDialog({
    open,
    onOpenChange,
    transaction,
    onSucces
}) {
    const handleReturn = () => {
        router.post(`/transactions/${transaction?.id}/return`, {}, {
            onSuccess: onSucces,
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Kembalikan Barang
                    </DialogTitle>
                    <DialogDescription>
                        {`Apakah anda yakin ingin menandai peminjaman ${transaction?.code} sebagai selesai?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'} >Batal</Button>
                    </DialogClose>
                    <Button variant={'accentOne'} onClick={handleReturn}>Kembalikan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}