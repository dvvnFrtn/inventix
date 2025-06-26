import { Head, router, usePage } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Combobox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CreateUserForm from "./CreateUserForm";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdateUserForm from "./UpdateUserForm";

export default function UserPage({ users: listUsers, role_options }) {
    const { props } = usePage()
    const flash = props.flash

    const users = listUsers?.data
    const roles = role_options?.map(i => ({ value: i?.name, label: i?.name }))

    const [selectedRole, setSelectedRole] = React.useState('')
    const [selectedUser, setSelectedUser] = React.useState(null)
    const [openCreateUserSheet, setOpenCreateUserSheet] = React.useState(false)
    const [openUpdateUserSheet, setOpenUpdateUserSheet] = React.useState(false)
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = React.useState(false)

    const [search, setSearch] = React.useState('')

    const handleRoleChange = (val) => {
        setSelectedRole(val)

        router.get('/users', {
            search: search !== '' ? search : undefined,
            role: val !== '' ? val : undefined
        }, {
            replace: true,
            preserveState: true,
            preserveScroll: true
        })
    }

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formatted = new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
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

    React.useEffect(() => {
        const delay = setTimeout(() => {
            router.get('/users', {
                search: search || undefined,
                role: selectedRole || undefined
            }, {
                replace: true,
                preserveScroll: true,
                preserveState: true,
            })
        }, 500)

        return () => clearTimeout(delay)
    }, [search])

    const sortedUsers = [...users].sort((a, b) => {
        return (a.role === 'admin' ? 0 : 1) - (b.role === 'admin' ? 0 : 1)
    })

    return (
        <>
            <Head title='Inventix - User' />
            <DashboardLayout
                title={'User'}
                description={'Berikut informasi data user pada sistem'}
            >
                <div className="flex w-full gap-6">
                    <Table
                        toolbar={
                            <div className="flex gap-2 w-full justify-between">
                                <div className="flex gap-4">
                                    <Combobox
                                        buttonLabel={'Role'}
                                        data={roles}
                                        emptyMessage={'Role tidak ada'}
                                        onChange={handleRoleChange}
                                        placeholder={'Cari role...'}
                                        value={selectedRole}
                                    />
                                    <Input
                                        placeholder="Cari user..."
                                        value={search}
                                        onChange={(val) => setSearch(val.target.value)} />

                                </div>
                                <CreateUserRightSheet
                                    open={openCreateUserSheet}
                                    onOpenChange={setOpenCreateUserSheet}
                                    trigger={(
                                        <Button
                                            variant="accentTwo"
                                            onClick={() => setOpenCreateUserSheet(true)}
                                        >
                                            Tambah User
                                        </Button>
                                    )}
                                />
                            </div>
                        }
                    >
                        <thead className="bg-slate-100 text-left text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Nama Lengkap</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium text-center">Dibuat</th>
                                <th className="px-6 py-4 font-medium text-center">Diubah</th>
                                <th className="px-6 py-4 text-right font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers?.length > 0
                                ? (
                                    sortedUsers?.map((user) => (
                                        <tr
                                            key={user?.id}
                                            className="cursor-pointer border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-normal">
                                                <Button
                                                    variant={'link'}
                                                    onClick={() => router.visit(`/users/${user.id}`)}
                                                    className={'text-itxAccentOne-500'}
                                                >
                                                    {user?.email}
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4">{user?.fullname}</td>
                                            <td className="px-6 py-4">{user?.role}</td>
                                            <td className="px-6 py-4 text-center">{formatDate(user?.created_at)}</td>
                                            <td className="px-6 py-4 text-center">{formatDate(user?.updated_at)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="accentOne"
                                                        onClick={() => {
                                                            setSelectedUser(user)
                                                            setOpenUpdateUserSheet(true)
                                                        }}
                                                    >
                                                        <Edit />
                                                    </Button>
                                                    {user?.role !== 'admin' &&
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => {
                                                                setSelectedUser(user)
                                                                setOpenDeleteUserDialog(true)
                                                            }}
                                                        >
                                                            <Trash2 />
                                                        </Button>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                                : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-slate-400">
                                            Tidak ada data user ditemukan.
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <CreateUserRightSheet
                        open={openCreateUserSheet}
                        onOpenChange={setOpenCreateUserSheet}
                        trigger={(
                            <Button
                                size="sm"
                                variant="accentOne"
                                className={'hidden'}
                                onClick={() => setOpenCreateUserSheet(true)}
                            >
                                Tambah User
                            </Button>
                        )}
                    />
                    <UpdateUserRightSheet
                        open={openUpdateUserSheet}
                        onOpenChange={setOpenUpdateUserSheet}
                        updatedUser={selectedUser}
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
                        deletedUser={selectedUser}
                        onSucces={() => setOpenDeleteUserDialog(false)}
                    />
                </div>
            </DashboardLayout>
        </>
    )
}

function CreateUserRightSheet({
    trigger,
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
                    <SheetTitle>Tambah User</SheetTitle>
                    <SheetDescription>
                        Isi form dibawah ini untuk menambahkan data user
                    </SheetDescription>
                </SheetHeader>
                <CreateUserForm
                    onClose={onOpenChange}
                />
            </SheetContent>
        </Sheet>
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