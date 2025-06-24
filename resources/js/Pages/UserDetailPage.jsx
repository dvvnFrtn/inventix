import { Head, router } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UpdateUserForm from "./UpdateUserForm";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function UserDetailPage({ user: rawUser }) {
    const user = rawUser?.data
    const transactions = user?.transactions

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formatted = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(date)

        return formatted
    }

    const [openUpdateUserSheet, setOpenUpdateUserSheet] = React.useState(false)
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = React.useState(false)

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
                                <th className="px-6 py-4 font-medium">Unit Dipinjam</th>
                                <th className="px-6 py-4 font-medium">Tgl Pinjam</th>
                                <th className="px-6 py-4 font-medium">Tgl Kembali</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 text-right font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.length > 0
                                ? (
                                    transactions?.map((tx) => (
                                        <tr key={tx?.id} className="border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors">
                                            <td className="px-6 py-4">{`#${tx?.code}`}</td>
                                            <td className="px-6 py-4">{tx?.unit?.label}</td>
                                            <td className="px-6 py-4">{formatDate(tx?.start)}</td>
                                            <td className="px-6 py-4 flex flex-col">
                                                {formatDate(tx?.end)}
                                                {tx?.late_message && (<p className="text-rose-400 text-sm">{tx?.late_message}</p>)}
                                            </td>
                                            <td className="px-6 py-4">{tx?.status === 0 ? 'Sedang' : 'Selesai'}</td>
                                            <td className="px-6 py-4 text-right">
                                                {tx?.status === 0 && (
                                                    <Button
                                                        size={'sm'}
                                                    >
                                                        Kembalikan
                                                    </Button>
                                                )}
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