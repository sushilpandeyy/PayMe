"use client"
import Image from "next/image";
import React from "react";
import OpenAccount from "../components/Openaccount";

export default function Accountopen() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <span>
    <h2 className="text-xl">Open an account to continue</h2>
    <OpenAccount/>
    </span>
    </main>
  );
}
