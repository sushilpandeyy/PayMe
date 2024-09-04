"use client";
import {Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button"
import {House, IndianRupee, ArrowLeftRight, LineChart, Home, ShoppingCart, Badge, Package, Users} from "lucide-react"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Link from "next/link";

type NavbarProps = {
  selected: string;
};

export default function Navbar({selected}: NavbarProps){
    return <nav className="gap-1 p-4 py-6 w-min">
      <Link 
      href="/dashboard"
      className={(selected=="Home"?"flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary mb-2":"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mb-2")}>
      <House className="size-5" />
        Home
      </Link>
      <Link 
      href="/transfer"
      className={(selected=="Transfer"?"flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary my-2":"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary my-2")}>
      <IndianRupee className="size-5" />
        Transfer
      </Link>
      <Link 
      href="/transaction"
      className={(selected=="Transaction"?"flex items-center gap-3 rounded-xl bg-muted px-3 py-2 text-primary transition-all hover:text-primary my-2":"flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary my-2")}>
      <ArrowLeftRight className="size-5" />
        Transactions
      </Link>
    </nav>
    /*<nav className="gap-1 p-4 py-6 w-min">
      <TooltipProvider>
        <div className="py-4">
        <Tooltip >
            <TooltipTrigger asChild>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className={(selected=="Home"?"rounded-lg bg-muted":"rounded-lg ")}
                aria-label="Home"
              >
                <House className="size-5" />
              </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Home
            </TooltipContent>
       </Tooltip>
       </div>
       <div className="py-4">
       <Tooltip>
            <TooltipTrigger asChild>
            <Link href="/transfer">
              <Button
                variant="ghost"
                size="icon"
                className={(selected=="Transfer"?"rounded-lg bg-muted":"rounded-lg ")}
                aria-label="Models"
              >
                <IndianRupee className="size-5" />
              </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Transfer Money
            </TooltipContent>
          </Tooltip>
          </div>
          <div className="py-4">
          <Tooltip>
          <Link href="/transaction">
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={(selected=="Transaction"?"rounded-lg bg-muted":"rounded-lg ")}
                aria-label="Models"
              >
                <ArrowLeftRight className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Transactions
            </TooltipContent>
            </Link>
          </Tooltip>
          </div>
       </TooltipProvider>
    </nav>*/
}