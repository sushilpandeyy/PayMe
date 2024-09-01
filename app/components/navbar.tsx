"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {HomeIcon} from "@radix-ui/react-icons"

export default function Navbar(){
    return <>
    <nav className="grid-cols-1	">
    <div>
    <Alert>
      <HomeIcon className="h-4 w-4" />
      <AlertTitle>Home</AlertTitle>
    </Alert>
    </div>
        <button type="button" className="p-2">
        Money Transfer
        </button>
        <button type="button" className="p-2">
        Transactions
        </button>
    </nav>
    </>
}