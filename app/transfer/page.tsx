"use client";
import { redirect } from 'next/navigation';
import Image from "next/image";
import Navbar from '../components/navbar';
import Transfertrans from '../components/Transfertrans';
import BalanceGraph from '../components/ui/BalanceGraph';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import ChangePinButton from "../components/Updatepincomp";

export default function Transfer() {
  // Retrieve session data from sessionStorage
  const sessionData = typeof window !== "undefined" ? sessionStorage.getItem("sessionData") : null;

  // If no session data, redirect to sign-in page
  if (!sessionData) {
    redirect('/api/auth/signin');
    return null; // Prevent rendering if redirecting
  }

  const session = JSON.parse(sessionData); // Parse the session data if it exists

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-3">
      <div className="flex content-start justify-start w-full">
        <Navbar selected="Transfer" />
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 lg:grid-cols-2">
          <div className="flex flex-col p-4">
            <h2 className="text-2xl p-1">Transfer Amount</h2>
            <Transfertrans />
          </div>
          <div className="flex flex-col p-12">
            <center>
              Box
              <div className="m-10">
                <ChangePinButton />
              </div>
            </center>
          </div>
        </div>
      </div>
    </main>
  );
}
