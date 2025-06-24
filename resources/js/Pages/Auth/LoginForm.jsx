import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'

const FormSchema = z.object({
    email: z.string().nonempty({
        message: 'Email wajib diisi'
    }),
    password: z.string().nonempty({
        message: 'Password wajib diisi'
    })
})

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    })

    const onSubmit = (data) => {
        router.post('/auth', {
            email: data.email,
            password: data.password
        }, {
            onError: (e) => console.log(e)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={'text-itxSurface'}>Email</FormLabel>
                            <FormControl>
                                <Input dark placeholder="Masukkan email anda" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={'text-itxSurface'}>Password</FormLabel>
                            <FormControl>
                                <Input dark placeholder="masukkan password anda" type={'password'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-6 mt-6">
                    <Button className={'w-full'} variant={'accentTwo'} type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}