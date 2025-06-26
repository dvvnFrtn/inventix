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
    }),
    image: z.any().nullable()
})

export default function UpdateInventoryForm({
    updatedInventory,
    categories,
    onClose
}) {
    const [previewUrl, setPreviewUrl] = React.useState(null)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: updatedInventory?.name ?? '',
            description: updatedInventory?.desc ?? '',
            category_id: updatedInventory?.category?.id,
        },
    })

    const onSubmit = (data) => {
        router.post(`/inventaris/${updatedInventory?.id}`, {
            _method: 'put',
            inventaris_name: data.name,
            inventaris_desc: data.description,
            category_id: data.category_id,
            image: data.image
        }, {
            onSuccess: () => {
                onClose?.()
            },
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-6">
                {previewUrl && (
                    <div className="w-full flex justify-center">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-60 w-full object-cover rounded-xl border"
                        />
                    </div>
                )}

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gambar</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        field.onChange(file)
                                        if (file) {
                                            const reader = new FileReader()
                                            reader.onloadend = () => {
                                                setPreviewUrl(reader.result)
                                            }
                                            reader.readAsDataURL(file)
                                        } else {
                                            setPreviewUrl(null)
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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