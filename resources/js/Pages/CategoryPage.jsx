import { Head, router } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "./DashboardLayout";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function CategoryPage({ categories: raw }) {
    const categories = raw?.data
    return (
        <>
            <Head title="Inventix - Kategori" />
            <DashboardLayout
                title={'Kategori'}
                description={'Kelola informasi data kategori'}
            >
                <div className="flex gap-6 h-screen w-full">
                    <div className="flex-1 bg-white border border-slate-300 rounded-3xl p-6">
                        <div className="flex flex-col gap2">
                            <h3 className="text-xl text-slate-800 font-medium">Daftar Kategori</h3>
                            <p className="text-sm text-slate-500">Berikut daftar data kategori yang tersedia.</p>
                        </div>
                        <div className="flex flex-col gap-6 mt-12">
                            {
                                categories?.map((c) => (
                                    <CategoryCard category={c} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex-1 bg-white border border-slate-300 rounded-3xl">

                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

function CategoryCard({ category }) {
    return (
        <div className="p-6 rounded-2xl bg-itxSurface border border-slate-300">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg text-itxPrimary-500 font-medium">{category?.name}</h3>
                <p className="text-sm text-slate-500">{category?.desc || '--'}</p>
            </div>
            {category?.name.toLowerCase() !== 'tidak ada' &&
                (
                    <div className="flex flex-row gap-2 justify-end">
                        <Button
                            size={'sm'}
                            variant={'accentOne'}
                        >Edit</Button>
                        <Button
                            size={'sm'}
                            variant={'destructive'}
                        >Hapus</Button>
                    </div>
                )
            }
        </div>
    )
}

const CreateShcema = z.object({
    name: z.string().nonempty({
        message: 'Nama kategori wajib dipilih'
    }),
    description: z.string().nullable()
})

function CreateForm() {
    const form = useForm({
        resolver: zodResolver(CreateShcema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const onSubmit = (data) => {
        router.post('/categories', {
            category_name: data.name,
            category_desc: data.description
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-6">
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan nama kategori' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan deskripsi (opsional)' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={'accentOne'} type={'submit'}>Simpan</Button>
            </form>
        </Form>
    )
}


function UpdateForm({ selectedCategory }) {
    const form = useForm({
        resolver: zodResolver(UpdateShcema),
        defaultValues: {
            name: selectedCategory?.name || '',
            description: selectedCategory?.desc || ''
        }
    })

    const onSubmit = (data) => {
        router.put(`/categories/${selectedCategory?.code}`, {
            category_name: data.name,
            category_desc: data.description
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-6">
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan nama kategori' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan deskripsi (opsional)' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={'accentOne'} type={'submit'}>Simpan</Button>
            </form>
        </Form>
    )
}

const UpdateShcema = z.object({
    name: z.string().nonempty({
        message: 'Nama kategori wajib dipilih'
    }),
    description: z.string().nullable()
})