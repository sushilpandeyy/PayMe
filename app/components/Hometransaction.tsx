"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter, File } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { subWeeks } from "date-fns";

interface Transaction {
  id: string;
  recipient: string;
  type: string;
  date: string;
  amount: number;
}

export default function HomeTransaction() {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string[]>(["Credit", "Debit", "Error"]);
  const [loading, setLoading] = useState(false);
  const [noTransactions, setNoTransactions] = useState(false); // New state for no transactions
  const initialLoad = useRef(true);

  // Helper function to fetch transactions
  const fetchTransactions = async () => {
    if (status !== "authenticated" || !session?.user?.email) return;

    setLoading(true); // Start loading state
    const today = new Date();
    const oneWeekAgo = subWeeks(today, 1);

    try {
      const response = await fetch("/api/p/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user?.email,
          startdate: oneWeekAgo, // Corrected date range (start is one week ago)
          enddate: today,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const result: { data: Transaction[] } = await response.json();
      setTransactions(result.data);
      setNoTransactions(result.data.length === 0); // Check if there are no transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Fetch transactions on first load or session change
  useEffect(() => {
    if (initialLoad.current && status === "authenticated") {
      fetchTransactions();
      initialLoad.current = false;
    }
  }, [status, session]); // Ensure the effect runs when the session or status changes

  // Toggle filter function
  const toggleFilter = (type: string) => {
    setFilter((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  return (
    <div className="pt-6">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent week transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filter.includes("Credit")}
                  onCheckedChange={() => toggleFilter("Credit")}
                >
                  Credit
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter.includes("Debit")}
                  onCheckedChange={() => toggleFilter("Debit")}
                >
                  Debit
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter.includes("Error")}
                  onCheckedChange={() => toggleFilter("Error")}
                >
                  Error
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Report</span>
            </Button>
          </div>

          {/* Loading State */}
          {loading ? (
            <p>Loading transactions...</p>
          ) : noTransactions ? (
            <p>No transactions found in the last week.</p>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .filter((transaction) => filter.includes(transaction.type))
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium">
                          {transaction.recipient}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {transaction.type}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ${transaction.amount}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
