import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  dark = false,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-slate-300 flex h-12 w-full min-w-0 rounded-lg border bg-slate-50 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-slate-50 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-itxAccentOne-500 focus-visible:ring-itxAccentOne-500/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        dark && [
          "bg-slate-800 border-slate-500 text-white",
          "focus-visible:border-itxAccentTwo-500 focus-visible:ring-itxAccentTwo-500/50",
          "aria-invalid:ring-destructive/40"
        ],
        className
      )}
      {...props} />
  );
}

export { Input }
