"use client";

import React, { useEffect, useState, useRef } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

const today = new Date();
const oneMonthAgo = subMonths(today, 1);

interface Transaction {
  Transaction_id: string;
  Amount: number;
  Sender_Id: string;
  Receiver_Id: string;
  Category: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionResponse {
  data: Transaction[];
  username: string;
}

function DatePickerWithRange({
  onDateChange,
}: {
  onDateChange: (date: DateRange | undefined) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: oneMonthAgo,
    to: today,
  });

  useEffect(() => {
    if (date) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  return (
    <div className={cn("grid gap-2 rounded-xl")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function TransactionTable() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<TransactionResponse | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneMonthAgo,
    to: today,
  });
  const initialLoad = useRef(true); // Track if this is the initial load
 
  const fetchTransactions = async (date: DateRange | undefined) => {
    if (!session || !date?.from || !date?.to) return;

    try {
      const response = await fetch("/api/p/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startdate: format(date.from, "yyyy-MM-dd"),
          enddate: format(date.to, "yyyy-MM-dd"),
          mail: session.user?.email,
        }),
      });

      const result: TransactionResponse = await response.json();
      setTransactions(result);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  //fetchTransactions(dateRange);
  useEffect(() => {
    // Only fetch transactions if not on initial load or if the date changes
    if (initialLoad.current) {
      fetchTransactions(dateRange); // Initial fetch
      initialLoad.current = false;
    } else {
      fetchTransactions(dateRange); // Fetch on date change
    }
  }, [dateRange]);

  const handleDateChange = (date: DateRange | undefined) => {
    setDateRange(date); // Set new date range which triggers useEffect
  };

  return (
    <div className="p-4">
      <DatePickerWithRange onDateChange={handleDateChange} />
      <div className="pt-2">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent Transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead className="hidden sm:table-cell">Counterparty</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.data.map((transaction) => (
                  <TableRow key={transaction.Transaction_id}>
                    <TableCell>{transaction.Transaction_id}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {transaction.Sender_Id === transactions.username
                        ? transaction.Receiver_Id
                        : transaction.Sender_Id}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {transaction.Sender_Id === transactions.username ? "Debit" : "Credit"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transaction.Category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">₹{transaction.Amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
