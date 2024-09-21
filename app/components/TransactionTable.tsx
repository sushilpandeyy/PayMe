"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
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

  const handleDateChange = useCallback(
    (newDate: DateRange | undefined) => {
      setDate(newDate);
      onDateChange(newDate);
    },
    [onDateChange]
  );

  const resetDateRange = useCallback(() => {
    setDate({
      from: oneMonthAgo,
      to: today,
    });
    onDateChange({
      from: oneMonthAgo,
      to: today,
    });
  }, [onDateChange]);

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
            <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
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
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={resetDateRange} className="mt-2">
        Reset Date Range
      </Button>
    </div>
  );
}

export default function TransactionTable() {
  const sessionData = useMemo(() => {
    if (typeof window !== "undefined") {
      const storedSession = sessionStorage.getItem("sessionData");
      return storedSession ? JSON.parse(storedSession) : null;
    }
    return null;
  }, []);

  const [transactions, setTransactions] = useState<TransactionResponse | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: oneMonthAgo,
    to: today,
  });
  const [loading, setLoading] = useState(false);
  const initialLoad = useRef(true);

  const fetchTransactions = useCallback(
    async (date: DateRange | undefined) => {
      if (!sessionData || !date?.from || !date?.to) return;

      setLoading(true); // Start loading

      try {
        const response = await fetch("/api/p/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startdate: format(date.from, "yyyy-MM-dd"),
            enddate: format(date.to, "yyyy-MM-dd"),
            mail: sessionData.user?.email,
          }),
        });

        const result: TransactionResponse = await response.json();
        setTransactions(result);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    },
    [sessionData]
  );

  useEffect(() => {
    // Fetch transactions only when initial load or date changes
    if (initialLoad.current) {
      fetchTransactions(dateRange); // Initial fetch
      initialLoad.current = false;
    } else {
      fetchTransactions(dateRange); // Fetch on date change
    }
  }, [dateRange, fetchTransactions]);

  const handleDateChange = useCallback((date: DateRange | undefined) => {
    setDateRange(date); // Set new date range which triggers useEffect
  }, []);

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
            {loading ? (
              <p>Loading transactions...</p>
            ) : (
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
                  {transactions?.data.map((transaction, index) => (
                    <TableRow key={`${transaction.Transaction_id}-${index}`}>
                      <TableCell>{transaction.Transaction_id}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {transaction.Sender_Id === transactions.username
                          ? transaction.Receiver_Id
                          : transaction.Sender_Id}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {transaction.Sender_Id === transactions.username ? "Debit" : "Credit"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.Category}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">₹{transaction.Amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
