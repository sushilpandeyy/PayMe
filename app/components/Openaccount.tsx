"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for client-side redirection
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogPortal,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { CreditCardIcon } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

function AccountOpen() {
  const [userID, setUserID] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession(); // Destructure the session data
  const router = useRouter(); // Use router for client-side navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePins(pin, confirmPin)) {
      return;
    }
    try {
      const response = await axios.post("/api/p/user/account", {
        userID: userID,
        PIN: pin,
        Email: session?.user?.email, // Use session data safely
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Account Created Successfully!",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to create account.",
          variant: "destructive",
        });
        console.log("Error:", response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account..",
        variant: "destructive",
      });
      console.error("Error:", error);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinValue = e.target.value.slice(0, 4); // Limit input to 4 characters
    setPin(pinValue);
  };

  const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPinValue = e.target.value.slice(0, 4); // Limit input to 4 characters
    setConfirmPin(confirmPinValue);
  };

  const validatePins = (pinValue: string, confirmPinValue: string): boolean => {
    const pinRegex = /^\d{4}$/;

    if (!pinRegex.test(pinValue)) {
      toast({
        title: "Error",
        description: "PIN must be exactly 4 digits long.",
        variant: "destructive",
      });
      console.log("Error:", "PIN must be exactly 4 digits long.");
      return false;
    } else if (pinValue !== confirmPinValue) {
      toast({
        title: "Error",
        description: "PIN and Confirm PIN do not match.",
        variant: "destructive",
      });
      console.log("Error:", "PIN and Confirm PIN do not match.");
      return false;
    }

    console.log("Success:", "PINs match and are valid.");
    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster />
      <DialogContent className="sm:max-w-[425px]">
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
            <Input
              id="UserID"
              placeholder="Enter your UserID"
              className="col-span-3"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="PIN" className="text-right">
              PIN
            </Label>
            <Input
              id="PIN"
              placeholder="Enter PIN"
              className="col-span-3"
              type="password"
              value={pin}
              onChange={handlePinChange}
              required
              maxLength={4} // Prevent more than 4 digits
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cPIN" className="text-right">
              Confirm PIN
            </Label>
            <Input
              id="cPIN"
              placeholder="Confirm PIN"
              className="col-span-3"
              type="password"
              value={confirmPin}
              onChange={handleConfirmPinChange}
              required
              maxLength={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}

export default function OpenAccount() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <CreditCardIcon /> Open Account
        </Button>
      </DialogTrigger>
      <AccountOpen />
    </Dialog>
  );
}