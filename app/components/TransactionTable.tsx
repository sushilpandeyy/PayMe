"use client";

import React, { useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, subMonths } from "date-fns";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSession } from "next-auth/react";

const today = new Date();
const oneMonthAgo = subMonths(today, 1);

function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: oneMonthAgo, 
    to: today,         
  });
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (date) {
      console.log(`From: ${format(date.from!, "yyyy-MM-dd")}`);
      if (date.to) {
        console.log(`To: ${format(date.to, "yyyy-MM-dd")}`);
      }
    }
  }, [date]);  

  return (
    <div className={cn("grid gap-2 rounded-xl", className)}>
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
  return (
    <div className="p-4">
      <DatePickerWithRange />
      <div className="pt-2">
      <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="px-7">
      <CardTitle>Transactions</CardTitle>
      <CardDescription>
        Recent Transactions
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead className="hidden sm:table-cell">
            Counterparty
            </TableHead>
            <TableHead className="hidden sm:table-cell">
            Type
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Category
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Date
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-accent">
            <TableCell>
              <div className="font-medium">Liam Johnson</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              Sale
            </TableCell>
            <TableCell className="hidden md:table-cell">
              2023-06-23
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  </div>
    </div>
  );
}
