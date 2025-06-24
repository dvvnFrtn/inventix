import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().nonempty({
        message: 'Nama barang wajib diisi'
    }),
    description: z.string().nullable(),
    category_id: z.string().nonempty({
        message: 'Kategori wajib dipilih'
    })
})

export default function UpdateInventoryForm({
    updatedInventory,
    categories,
    onClose
}) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: updatedInventory?.name ?? '',
            description: updatedInventory?.desc ?? '',
            category_id: updatedInventory?.category?.id
        },
    })

    const onSubmit = (data) => {
        router.put(`/inventaris/${updatedInventory?.id}`, {
            inventaris_name: data.name,
            inventaris_desc: data.description,
            category_id: data.category_id,
        }, {
            onSuccess: () => {
                onClose?.()
            },
            onError: (e) => console.log(e)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Barang</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan nama barang' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan deskripsi opsional' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value ? String(field.value) : undefined}
                                defaultValue={field.value ? String(field.value) : undefined}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih category..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories?.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={'accentOne'} type={'submit'}>Simpan</Button>
            </form>
        </Form>
    )
}