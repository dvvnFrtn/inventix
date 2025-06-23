import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().nonempty({
        message: 'Nama barang wajib diisi'
    }),
    description: z.string(),
    picture: z.any().optional(),
})

export default function InventoryAddForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            description: ''
        },
    })

    const onSubmit = (data) => {
        console.log(data)
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
                    name="picture"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gambar Barang</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => field.onChange(e.target.files)}
                                />
                            </FormControl>
                            {form.watch("picture")?.[0] && (
                                <img
                                    src={URL.createObjectURL(form.watch("picture")[0])}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md"
                                />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={'accentOne'} type={'submit'}>Simpan</Button>
            </form>
        </Form>
    )
}