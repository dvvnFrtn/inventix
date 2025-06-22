import { Head } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "../DashboardLayout";

export default function TransactionPage() {
    return (
        <>
            <Head title="Inventix - Transactions" />
            <DashboardLayout title={'Transactions'}>
                Transactions
            </DashboardLayout>
        </>
    )
}