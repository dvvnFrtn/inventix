import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    unit_id: z.string(),
    description: z.string(),
    user: z.string(),
    transaction_start: z.string(),
    transaction_end: z.string()
})

export default function CreateTransactionForm({
    selectedUnit,
}) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            unit_id: selectedUnit?.id,
            description: '',
            user: '',
            transaction_start: Date.now(),
            transaction_end: Date.now()
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
                    name="user"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peminjam</FormLabel>
                            <FormControl>
                                <Input placeholder='Masukkan deskripsi opsional' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="transaction_start"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mulai Peminjaman</FormLabel>
                            <FormControl>
                                <Input type={'date'} placeholder='Masukkan deskripsi opsional' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="transaction_end"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Akhir Peminjaman</FormLabel>
                            <FormControl>
                                <Input type={'date'} placeholder='Masukkan deskripsi opsional' {...field} />
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