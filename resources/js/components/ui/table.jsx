import React from "react"

export default function Table({ children, toolbar }) {
    return (
        <div className="space-y-4 w-full">
            {toolbar && (
                <div className="flex items-center justify-between">
                    {toolbar}
                </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-300 overflow-hidden">
                <table className="w-full text-sm text-slate-800">
                    {children}
                </table>
            </div>
        </div>
    )
}
