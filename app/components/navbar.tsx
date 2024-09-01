"use client";

export default function Navbar(){
    return <>
    <nav className="grid-cols-1	">
        <button type="button" className="p-2">
        Home
        </button>
        <button type="button" className="p-2">
        Money Transfer
        </button>
        <button type="button" className="p-2">
        Transactions
        </button>
    </nav>
    </>
}