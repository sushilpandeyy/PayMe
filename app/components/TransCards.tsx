"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { IndianRupee, ArrowDownUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

function TotalBalCard(){
    return <Card className="p-4 h-max">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
  }
  
  function TransactionsCard(){
    return <Card className="p-4 h-max">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Transactions</CardTitle>
      <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+2350</div>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardContent>
  </Card>
  }

  function InCard(){
    return <Card className="p-4 h-max">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Incoming</CardTitle>
      <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+2350</div>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardContent>
  </Card>
  }

  function OutCard(){
    return <Card className="p-4 h-max">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Spend</CardTitle>
      <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+2350</div>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardContent>
  </Card>
  }

  export {TransactionsCard, TotalBalCard, InCard, OutCard}
