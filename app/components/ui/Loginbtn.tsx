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
      <div>
        <Link href="/api/auth/signin">Get Started </Link>
      </div>
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
          <Link href={"/home"}>
        <DropdownMenuItem>
            Home
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <Link href={"/transfer"}>
          <DropdownMenuItem>
            Transfer Money
          </DropdownMenuItem>
          </Link>
          <Link href={"/transaction"}>
          <DropdownMenuItem>
            Transactions 
          </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Report
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={"https://github.com/sushilpandeyy/payme"}>
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        </Link>
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