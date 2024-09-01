"use client";
import {Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button"
import {House, IndianRupee, ArrowLeftRight} from "lucide-react"
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Navbar(){
    return <nav className="grid gap-1 p-2 w-min">
      <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Home"
              >
                <House className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Home
            </TooltipContent>
       </Tooltip>
       <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Models"
              >
                <IndianRupee className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Transfer Money
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Models"
              >
                <ArrowLeftRight className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Transactions
            </TooltipContent>
          </Tooltip>
       </TooltipProvider>
    </nav>
}