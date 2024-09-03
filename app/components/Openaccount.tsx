"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button";
import { CreditCardIcon } from "lucide-react";

function Accountopen(){
    return <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Create Account</DialogTitle>
      <DialogDescription>
        Create your UserID & Secret PIN.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="UserID" className="text-right">
          UserID
        </Label>
        <Input id="UserID" placeholder="Enter your UserID" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="PIN" className="text-right">
          PIN
        </Label>
        <Input id="PIN" placeholder="Enter PIN" className="col-span-3" type="password" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cPIN" className="text-right">
          Confirm PIN
        </Label>
        <Input id="cPIN" placeholder="Confirm PIN" className="col-span-3" type="password" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Create Account</Button>
    </DialogFooter>
  </DialogContent>
}

export default function OpenAccount(){
    return <Dialog>
    <DialogTrigger>
<Button>
    <CreditCardIcon
    />Open Account
</Button>
</DialogTrigger>
    <Accountopen/>
</Dialog>
}