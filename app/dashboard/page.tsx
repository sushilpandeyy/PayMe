"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import Setcardh from '../components/Setcardh';
import Navbar from '../components/navbar';
import { Piecharthead } from '../components/ui/Piechart';

export default function Dashboard() {
const a= useSession();

if(a.status=="unauthenticated"){
  redirect('/api/auth/signin')
}
  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-3">
    <div className="flex content-start justify-start">
    <Navbar/>
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      <div>
    <Setcardh/>
      </div>
      <div>
    <Piecharthead/>
      </div>
    </div>
    </div>
    </main>
  );
}
