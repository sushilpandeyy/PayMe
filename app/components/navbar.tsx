"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { House, DollarSignIcon, ArrowLeftRight, Coins } from "lucide-react";
import Link from "next/link";

type NavbarProps = {
  selected: string;
};

export default function Navbar({ selected }: NavbarProps) {
  return (
    <nav className="flex flex-row gap-1 p-4 py-6 w-full justify-start">
      <Link
        href="/home"
        className={
          selected == "Home"
            ? "flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        }
      >
        <House className="size-5" />
        Home
      </Link>
      <Link
        href="/transfer"
        className={
          selected == "Transfer"
            ? "flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        }
      >
        <DollarSignIcon className="size-5" />
        Transfer
      </Link>
      <Link
        href="/transaction"
        className={
          selected == "Transaction"
            ? "flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        }
      >
        <ArrowLeftRight className="size-5" />
        Transactions
      </Link>
      <Link
        href="/crypto"
        className={
          selected == "crypto"
            ? "flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        }
      >
        <Coins className="size-5" />
        Crypto
      </Link>
    </nav>
  );
}