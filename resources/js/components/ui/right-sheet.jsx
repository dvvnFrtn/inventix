import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";

export default function RightSheet({
    triggerLabel,
    triggerVariant,
    sheetTitle,
    sheetDescription,
    children
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant={triggerVariant}
                >
                    {triggerLabel}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}