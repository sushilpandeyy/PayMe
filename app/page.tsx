"use client"

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Appbar from "./components/appbar";
import { Provider } from "./provider";
import Link from "next/link";
export default function Home() {

  return (
    <main>
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-4xl font-bold">
                PayMe
            </h1>
            <div>
              <Link href="/dashboard">
               <Button>
                Dashboard
               </Button>
               </Link>
            </div>
        </div>
    
    </main>
  );
}
