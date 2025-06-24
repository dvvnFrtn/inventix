import { Head, router } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import Table from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Combobox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

export default function UserPage({ users: listUsers, role_options }) {
    const users = listUsers?.data
    const roles = role_options?.map(i => ({ value: i?.name, label: i?.name }))

    const [selectedRole, setSelectedRole] = React.useState('')

    const handleRoleChange = (val) => {
        setSelectedRole(val)

        router.get('/users', {
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
                                    <Input placeholder="Cari user..." />
                                </div>
                                <Button variant="accentTwo">
                                    Tambah User
                                </Button>
                            </div>
                        }
                    >
                        <thead className="bg-slate-100 text-left text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Email</th>
                                <th className="px-6 py-4 font-medium">Nama Lengkap</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Dibuat</th>
                                <th className="px-6 py-4 font-medium">Diubah</th>
                                <th className="px-6 py-4 text-right font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0
                                ? (
                                    users?.map((user) => (
                                        <tr
                                            onClick={() => router.visit(`/users/${user?.id}`)}
                                            key={user?.id}
                                            className="cursor-pointer border-t border-slate-200 hover:bg-itxAccentTwo-100 transition-colors"
                                        >
                                            <td className="px-6 py-4">{user?.email}</td>
                                            <td className="px-6 py-4">{user?.fullname}</td>
                                            <td className="px-6 py-4">{user?.role}</td>
                                            <td className="px-6 py-4">{formatDate(user?.created_at)}</td>
                                            <td className="px-6 py-4">{formatDate(user?.updated_at)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="accentOne"
                                                    >
                                                        <Edit />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
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
                </div>
            </DashboardLayout>
        </>
    )
}