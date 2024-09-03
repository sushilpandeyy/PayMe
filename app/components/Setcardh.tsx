"use client";
import React from "react";
import { TransactionsCard, TotalBalCard, InCard, OutCard } from "./TransCards";


export default function Setcardh() {
  
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <TotalBalCard/>
        <TransactionsCard/>
        <InCard/>
        <OutCard/>
      </div>
    </>
  );
}
