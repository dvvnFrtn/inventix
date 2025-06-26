import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { router } from "@inertiajs/react";

const FormSchema = z.object({
    label: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    status: z.enum(['tersedia', 'terpinjam', 'tiada']),
    condition_id: z.preprocess(
        (val) => val === '' ? undefined : Number(val),
        z.number({ message: 'Kondisi wajib dipilih' })
    )
})

export default function UpdateInventoryUnitForm({
    updatedUnit,
    conditions,
    onClose
}) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            label: updatedUnit?.label ?? '',
            description: updatedUnit?.description ?? '',
            status: updatedUnit?.status,
            condition_id: updatedUnit?.condition?.id
        }
    })

    const onSubmit = (data) => {
        router.put(`/inventaris/updateUnit/${updatedUnit?.id}`, {
            inventarisd_label: data.label,
            inventarisd_desc: data.description,
            inventarisd_status: data.status,
            kondisi_id: Number(data.condition_id)
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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label Unit</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukkan nama label (opsional)" {...field} />
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
                                <Input placeholder="Masukkan deskripsi (opsional)" {...field} />
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
                            <Select
                                onValueChange={field.onChange}
                                value={field.value ? String(field.value) : undefined}
                                defaultValue={field.value ? String(field.value) : undefined}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Status..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem key={1} value={'tersedia'}>
                                        Tersedia
                                    </SelectItem>
                                    <SelectItem key={2} value={'terpinjam'}>
                                        Terpinjam
                                    </SelectItem>
                                    <SelectItem key={3} value={'tiada'}>
                                        Tiada
                                    </SelectItem>
                                </SelectContent>
                            </Select>
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
                            <Select
                                onValueChange={field.onChange}
                                value={field.value ? String(field.value) : undefined}
                                defaultValue={field.value ? String(field.value) : undefined}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kondisi..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {conditions.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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