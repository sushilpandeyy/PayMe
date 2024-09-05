"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import Navbar from '../components/navbar';
import { Button } from '@/components/ui/button';
import TransactionTable from '../components/TransactionTable';
import { Headcards } from '../components/Setcardh';


function Buttons2export(){
  return <div className="grid grid-cols-4 gap-2 w-full">
  <h2 className="col-span-3 text-xl pt-4">Transactions</h2>
  <div className="pt-4 justify-self-end">
    <Button variant="outline" size="lg">Export</Button>
  </div>
</div>
}

export default function Transaction() {
const a= useSession();

if(a.status=="unauthenticated"){
  redirect('/api/auth/signin')
}
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-3">
    <div className="flex content-start justify-start w-full">
    <Navbar
     selected="Transaction"
    />
    <div className="headcards w-full">
    <Headcards/>
    <div className="btns">
    <Buttons2export/>
    </div>
    <div className="Transactionslist">
      <TransactionTable/>
    </div>
    </div>
    </div>
    </main>
  );
}
