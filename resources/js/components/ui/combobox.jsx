import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { CommandInput } from "cmdk";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Combobox({
    data,
    buttonLabel,
    emptyMessage,
    value,
    onChange,
    placeholder,
}) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'secondary'}
                    role='combobox'
                    aria-expanded={open}
                    className={'w-[200px] justify-between'}
                >
                    {
                        value ? data.find((d) => d.value === value)?.label : buttonLabel
                    }
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={'w-[200px]'}>
                <Command>
                    <CommandInput placeholder={placeholder} className="h-9" />
                    <CommandList>
                        <CommandEmpty>
                            {emptyMessage}
                        </CommandEmpty>
                        <CommandGroup>
                            {
                                data.map((d) => (
                                    <CommandItem
                                        key={d.value}
                                        value={d.value}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {d.label}
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}