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
    pass: z.string().nullable(),
    name: z.string().nonempty({
        message: 'Nama lengkap wajib diisi'
    }),
})

export default function UpdateUserForm({ updatedUser, onClose }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: updatedUser?.fullname ?? '',
            pass: updatedUser?.pass ?? '',
        }
    })

    const onSubmit = (data) => {
        router.put(`/users/${updatedUser?.id}`, {
            user_pass: data.pass,
            user_fullname: data.name,
        }, {
            onSuccess: () => {
                onClose?.()
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='pass'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder='Ganti password user'  {...field} type={'password'} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={'accentOne'} className={'w-full mt-6'}>
                    Simpan
                </Button>
            </form>
        </Form>
    )
}