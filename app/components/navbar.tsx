"use client";
import {Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button"
import {House, IndianRupee, ArrowLeftRight} from "lucide-react"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Link from "next/link";

type NavbarProps = {
  selected: string;
};

export default function Navbar({selected}: NavbarProps){
    return <nav className="gap-1 p-4 py-6 w-min">
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
    </nav>
}