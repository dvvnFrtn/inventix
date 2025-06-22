import React from "react";
import { Head } from "@inertiajs/react";
import DashboardLayout from "../DashboardLayout";

export default function DashboardPage() {
    return (
        <>
            <Head title="Inventix - Dashboard" />
            <DashboardLayout title={'Dashboard'}>
                Dashboard
            </DashboardLayout>
        </>
    )
}