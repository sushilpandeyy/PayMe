"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogPortal, DialogClose } from "@/components/ui/dialog";  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function UpdatePin() {
  const [userID, setUserID] = useState("");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(true);  

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePins(newPin, confirmNewPin)) {
      return;
    }
    try {
      const response = await axios.put('/api/p/user/account', {
        userID: userID,
        PIN: currentPin,
        NewPin: newPin,
      });
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "PIN updated successfully!",
        });
        setNewPin("");
        setConfirmNewPin("");
        setDialogOpen(false);  
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to update PIN.",
          variant: "destructive",
        });
        setNewPin("");
        setConfirmNewPin("");
        console.log("Error:", response.data);
      }
    } catch (error) {
        setNewPin("");
        setConfirmNewPin("");
      console.error("Error:", error);
    }
  };

  const handleCurrentPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinValue = e.target.value.slice(0, 4);
    setCurrentPin(pinValue);
  };

  const handleNewPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinValue = e.target.value.slice(0, 4);
    setNewPin(pinValue);
  };

  const handleConfirmNewPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinValue = e.target.value.slice(0, 4);
    setConfirmNewPin(pinValue);
  };

  const validatePins = (pinValue: string, confirmPinValue: string): boolean => {
    const pinRegex = /^\d{4}$/;

    if (!pinRegex.test(pinValue)) {
      toast({
        title: "Error",
        description: "PIN must be exactly 4 digits long.",
        variant: "destructive",
      });
      setNewPin("");
      setConfirmNewPin("");
      console.log("Error:", "PIN must be exactly 4 digits long.");
      return false;
    } else if (pinValue !== confirmPinValue) {
      setNewPin("");
      setConfirmNewPin("");
      toast({
        title: "Error",
        description: "New PIN and Confirm New PIN do not match.",
        variant: "destructive",
      });
      console.log("Error:", "New PIN and Confirm New PIN do not match.");
      setNewPin("");
      setConfirmNewPin("");
      return false;
    }

    console.log("Success:", "PINs match and are valid.");
    return true;
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          <Lock className="h-6 w-6" />
          <span className="sr-only sm:not-sr-only">Change PIN</span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <Toaster />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update PIN</DialogTitle>
            <DialogDescription>
              Update your existing PIN with a new one.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="UpdateUserID" className="text-right">
                  UserID
                </Label>
                <Input
                  id="UpdateUserID"
                  placeholder="Enter your UserID"
                  className="col-span-3"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="CurrentPIN" className="text-right">
                  Current PIN
                </Label>
                <Input
                  id="CurrentPIN"
                  placeholder="Enter current PIN"
                  className="col-span-3"
                  type="password"
                  value={currentPin}
                  onChange={handleCurrentPinChange}
                  required
                  maxLength={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="NewPIN" className="text-right">
                  New PIN
                </Label>
                <Input
                  id="NewPIN"
                  placeholder="Enter new PIN"
                  className="col-span-3"
                  type="password"
                  value={newPin}
                  onChange={handleNewPinChange}
                  required
                  maxLength={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ConfirmNewPIN" className="text-right">
                  Confirm New PIN
                </Label>
                <Input
                  id="ConfirmNewPIN"
                  placeholder="Confirm new PIN"
                  className="col-span-3"
                  type="password"
                  value={confirmNewPin}
                  onChange={handleConfirmNewPinChange}
                  required
                  maxLength={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update PIN</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default function ChangePinButton() {
  return (
    <div className="m-10">
      <UpdatePin />
    </div>
  );
}