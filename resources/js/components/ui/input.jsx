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
        "file:text-slate-500 file:inline-flex file:items-center file:justify-center",
        "items-center",
        "placeholder:text-muted-foreground selection:bg-itxAccentOne-200 selection:text-itxAccentOne-500",
        "dark:bg-input/30 border-slate-300 flex h-14 w-full min-w-0 rounded-xl border bg-slate-50 px-3 py-0", // <-- ubah py-4 jadi py-0
        "text-base shadow-xs transition-[color,box-shadow] outline-none",
        "file:h-14 file:bg-slate-50 file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-itxAccentOne-500 focus-visible:ring-itxAccentOne-500/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-rose-400/20 dark:aria-invalid:ring-rose-400/40 aria-invalid:border-rose-400",
        dark && [
          "bg-slate-800 border-slate-500 text-white",
          "focus-visible:border-itxAccentTwo-500 focus-visible:ring-itxAccentTwo-500/50",
        ],
        className
      )}
      {...props} />
  );
}

export { Input }
