"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"
import Navbar from '../components/navbar';

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
    </div>
    </main>
  );
}
