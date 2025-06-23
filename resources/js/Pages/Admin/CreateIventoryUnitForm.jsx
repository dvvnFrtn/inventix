import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().nonempty({
        message: 'Nama unit wajib diisi',
    }),
    description: z.string(),
    status: z.string().nonempty({
        message: 'Status wajib diisi'
    }),
    condition_id: z.number(),
})

export default function CreateInventoryUnitForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            description: '',
            status: '',
            condition_id: 0
        }
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
                            <FormLabel>Nama Unit</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan nama unit' {...field} />
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
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan status' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="condition_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kondisi</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan kondisi' {...field} type={'number'} />
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