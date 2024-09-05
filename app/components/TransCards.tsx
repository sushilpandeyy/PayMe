"use client";
import React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { IndianRupee, ArrowDownUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

function TotalBalCard({ balance, user }: { balance: number, user: string }) {
    return (
        <Card className="p-4 h-max">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Balance for {user}</p>
            </CardContent>
        </Card>
    );
}

function TransactionsCard({ transactions }: { transactions: number }) {
    return (
        <Card className="p-4 h-max">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{transactions}</div>
                <p className="text-xs text-muted-foreground">Total Transactions</p>
            </CardContent>
        </Card>
    );
}

function InCard({ credit }: { credit: number }) {
    return (
        <Card className="p-4 h-max">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Incoming</CardTitle>
                <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{credit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Incoming</p>
            </CardContent>
        </Card>
    );
}

function OutCard({ debit }: { debit: number }) {
    return (
        <Card className="p-4 h-max">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Spend</CardTitle>
                <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{debit.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Spent</p>
            </CardContent>
        </Card>
    );
}

export { TransactionsCard, TotalBalCard, InCard, OutCard };