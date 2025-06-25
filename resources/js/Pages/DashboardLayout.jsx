import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { Archive, ArrowLeft, ArrowRight, Bell, BookOpen, Home, LayoutGrid, LogOut, Users } from "lucide-react";
import { Toaster } from "sonner"
import React from "react";

const menuItems = [
    { icon: <Home size={24} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <BookOpen size={24} />, label: 'Peminjaman', href: '/transactions' },
    { icon: <Users size={24} />, label: 'User', href: '/users' },
    { icon: <Archive size={24} />, label: 'Inventaris', href: '/inventaris' },
]

const menuItemsGuru = [
    { icon: <Home size={24} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <BookOpen size={24} />, label: 'Peminjaman', href: '/transactions' },
    { icon: <Archive size={24} />, label: 'Inventaris', href: '/inventaris' },
]

function Sidebar({ collapsed, onCollapsed }) {
    const { url, props } = usePage()

    const menu = props.auth?.user_role !== 'guru' ? menuItems : menuItemsGuru

    return (
        <div
            className={`${collapsed ? 'w-fit' : 'w-64'
                } h-screen fixed z-10 transition-all duration-300 ease-in-out bg-itxPrimary-500 text-itxSurface flex flex-col justify-between px-6`}
        >
            <div>
                <div className={`flex items-center ${!collapsed ? 'justify-between' : 'justify-center'} py-12`}>
                    {!collapsed && <h1 className="text-2xl font-semibold text-itxAccentOne-500">Inventix</h1>}
                    <Button
                        onClick={() => onCollapsed()}
                        variant={'accentOne'}
                        className={'size-14 text-itxPrimary-500'}
                    >
                        {collapsed ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
                    </Button>
                </div>

                <div className="border-t border-slate-500 mb-12" />

                <nav className="flex flex-col gap-4">
                    {menu.map((item, index) => {
                        const isActive = url.startsWith(item.href)
                        return (
                            <Link
                                preserveState
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-6 px-4 py-4 rounded-full transition-all duration-300 ease-out",
                                    isActive
                                        ? "bg-itxAccentTwo-500 text-itxPrimary-500 rounded-2xl font-semibold"
                                        : "bg-itxPrimary-500 hover:bg-itxPrimary-600 text-itxSurface"
                                )}
                            >
                                {item.icon}
                                {!collapsed && <span className="text-sm">{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default function DashboardLayout({ title, description, children }) {
    const { props } = usePage()
    const auth = props.auth
    const [collapsed, setCollapsed] = React.useState(() => {
        const saved = localStorage.getItem('sidebar-collapsed')
        return saved === 'true'
    })

    const toggleSidebar = () => {
        localStorage.setItem('sidebar-collapsed', String(!collapsed))
        setCollapsed(!collapsed)
    }

    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="flex min-h-screen bg-itxPrimary-500">
                <Sidebar collapsed={collapsed} onCollapsed={toggleSidebar} />
                <main
                    className={`${!collapsed ? 'ml-64' : 'ml-[104px]'} flex-1 py-6 px-16 transition-all duration-300 bg-itxSurface rounded-s-4xl`}
                >
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex flex-col gap-2 justify-center">
                            <h2 className="text-4xl font-medium text-slate-800">{title}</h2>
                            {description && (<p className="text-sm text-slate-500 text-ellipsis text-nowrap">{description}</p>)}
                        </div>
                        <div className="flex flex-row gap-6 items-center">
                            <Button size={'icon'} variant={'secondary'}>
                                <LogOut size={24} />
                            </Button>
                            <div className="flex flex-col gap-2">
                                <p className="text-slate-500">{auth?.user_fullname}</p>
                                <Badge className={'bg-violet-200 text-violet-500 font-medium'}>{auth?.user_role}</Badge>
                            </div>
                        </div>
                    </div>
                    {children}
                </main>
            </div>
        </>
    )
}