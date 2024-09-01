"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";

export default function Loginbtn() {
    return (
      <Button  asChild
      variant="ghost"
      size="icon"
      className="rounded-lg bg-muted"
      aria-label="Home"
      >
        <Link href="/api/auth/signin">Login</Link>
      </Button>
    )
  }

export function Logindrop({ children }: { children: React.ReactNode }){
    return (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Transfer Money
          </DropdownMenuItem>
          <DropdownMenuItem>
            Transactions 
          </DropdownMenuItem>
          <DropdownMenuItem>
            Report
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div onClick={()=>{
            signOut()
          }}>Log out</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}