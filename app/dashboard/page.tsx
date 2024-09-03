"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import Setcardh from '../components/Setcardh';
import Navbar from '../components/navbar';
import { Piecharthead } from '../components/ui/Piechart';
import HomeTransaction from '../components/Hometransaction';
import AccountCreate from '../components/AccoutCreate';

export default function Dashboard() {
const sessioninf= useSession();

if(sessioninf.status=="unauthenticated"){
  redirect('/api/auth/signin')
}
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-3">
    <div className="flex content-start justify-start w-full">
    <Navbar
     selected="Home"
    />
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 lg:grid-cols-2">
  <div className="flex flex-col">
    <Setcardh />
    <HomeTransaction/>
  </div>
  <div className="flex flex-col">
    <AccountCreate/>
    <div className="pt-6">
    <Piecharthead />
    </div>
  </div>
</div>
    </div>
    </main>
  );
}
