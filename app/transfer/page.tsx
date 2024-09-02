"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import Navbar from '../components/navbar';
import Transfertrans from '../components/Transfertrans';
import BalanceGraph from '../components/ui/BalanceGraph';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export default function Transfer() {
const a= useSession();

if(a.status=="unauthenticated"){
  redirect('/api/auth/signin')
}
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-3">
    <div className="flex content-start justify-start w-full">
    <Navbar
     selected="Transfer"
    />
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 lg:grid-cols-2">
  <div className="flex flex-col p-4">
  <h2 className="text-2xl p-1">Transfer Amount</h2>
   <Transfertrans/>
  </div>
  <div className="flex flex-col p-12">
    <center>
    <BalanceGraph/>
    <div className="m-10">
    <Button>
        <Lock className="h-6 w-6" />
        <span className="sr-only sm:not-sr-only">Change PIN</span>
    </Button>
      </div>
    </center>
  </div>
</div>
    </div>
    </main>
  );
}
