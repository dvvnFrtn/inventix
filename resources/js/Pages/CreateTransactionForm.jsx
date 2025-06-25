import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    description: z.string().nullish(),
    unit_id: z.string().nonempty(),
    user_id: z.string().nonempty({
        message: 'Peminjam wajib dipilih'
    }),
    start: z.coerce.date({
        required_error: 'Tanggal mulai harus diisi',
        invalid_type_error: 'Tanggal mulai tidak valid',
    }),
    end: z.coerce.date({
        required_error: 'Tanggal selesai harus diisi',
        invalid_type_error: 'Tanggal selesai tidak valid',
    }),
}).refine((data) => data.end >= data.start, {
    message: 'Tanggal selesai tidak boleh lebih awal dari tanggal mulai',
    path: ['end'],
}).refine((data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.start >= today;
}, {
    message: 'Tanggal mulai tidak boleh lebih awal dari tanggal sekarang',
    path: ['start'],
});

export default function CreateTransactionForm({
    selectedUnit, users, onClose
}) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: undefined,
            user_id: '',
            unit_id: selectedUnit?.id,
            start: Date.now(),
            end: Date.now()
        }
    })

    const onSubmit = (data) => {
        console.log(data)
        router.post('/transactions', {
            inventarisd_id: data.unit_id,
            user_id: data.user_id,
            transaction_desc: data.description,
            transaction_start: data.start,
            transaction_end: data.end
        }, {
            onSuccess: () => {
                onClose?.()
            },
            onError: (e) => console.log(e)
        })
    }

    const [openUserPopover, setOpenUserPopover] = React.useState(false)

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
                    name="user_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Peminjam</FormLabel>
                            <Popover open={openUserPopover} onOpenChange={setOpenUserPopover}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'secondary'}
                                            role={'combobox'}
                                            className={'w-full justify-between rounded-xl'}
                                        >
                                            {field.value
                                                ? users?.find(
                                                    (user) => user?.user_id === field.value
                                                )?.user_fullname
                                                : 'Pilih peminjam'}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className={'w-[var(--radix-popover-trigger-width)]'}>
                                    <Command>
                                        <CommandInput
                                            placeholder='Cari peminjam...'
                                            className={'h-14'}
                                        />
                                        <CommandList>
                                            <CommandEmpty>Peminjam tidak ada</CommandEmpty>
                                            <CommandGroup>
                                                {users?.map((user) => (
                                                    <CommandItem
                                                        value={user?.user_fullname}
                                                        key={user?.user_id}
                                                        onSelect={() => {
                                                            form.setValue('user_id', user?.user_id)
                                                            setOpenUserPopover(false)
                                                        }}
                                                    >
                                                        <div className="flex flex-col gap-2">
                                                            <h6>
                                                                {user?.user_fullname}
                                                            </h6>
                                                            <p className="text-xs text-itxAccentOne-700">
                                                                {user?.user_email}
                                                            </p>
                                                        </div>
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                user?.user_id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tanggal Mulai</FormLabel>
                            <FormControl>
                                <Input type={'date'} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tanggal Selesai</FormLabel>
                            <FormControl>
                                <Input type={'date'} placeholder='Pilih tanggal' {...field} />
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