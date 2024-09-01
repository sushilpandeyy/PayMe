"use client"
import { redirect } from 'next/navigation'
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"

export default function Dashboard() {
const a= useSession();

if(a.status=="unauthenticated"){
  redirect('/api/auth/signin')
}
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home {a.data?.user?.name} <a onClick={()=>{
        signOut()
      }}>{a.status}</a>
    </main>
  );
}
