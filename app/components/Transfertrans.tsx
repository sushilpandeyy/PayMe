"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle, CardHeader, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Share } from "lucide-react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Pinbox(){
  const handlePIN = async () => {
    try {
      const response = await axios.post(`/api/p/transaction/`);
      if (response.status === 200) {
        
        console.log("Verified")
      }
      else {
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

}

export default function Transfertrans() {
  const [userID, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verified" | "Low" | "notFound" | "error">("idle");

  const handleSend = async () => {
    try {
      const response = await axios.get(`/api/p/transaction/verify?id=${userID}&amt=${amount}`);
      if (response.status === 200) {
        setVerificationStatus("verified");
        console.log("Verified")
        Pinbox
      } else if(response.status === 201){
        setVerificationStatus("Low");
      }
      else {
        setVerificationStatus("notFound");
      }
    } catch (error) {
      console.error("Error:", error);
      setVerificationStatus("error");
    }
  };

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle></CardTitle>
        <CardDescription className="text-balance max-w-lg leading-relaxed">
          <Tabs defaultValue="Send" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Send">Send</TabsTrigger>
              <TabsTrigger value="Receive">Receive</TabsTrigger>
            </TabsList>
            <TabsContent value="Send">
              <Card>
                <CardHeader>
                  <CardTitle>Send Money</CardTitle>
                  <CardDescription>Send money to any userid</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="User_ID">User ID</Label>
                    <Input
                      id="User_ID"
                      placeholder="Enter Reciver's UserID"
                      value={userID}
                      onChange={(e) => setUserID(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSend}>Send</Button>
                </CardFooter>
              </Card>
              {/* Conditional Rendering Based on API Response */}
              {verificationStatus === "verified" && (
                <div className="mt-4 text-green-500">
                  Account verified! Proceed with the transaction.
                </div>
              )}
              {verificationStatus === "notFound" && (
                <div className="mt-4 text-red-500">
                  UserID not found. Please check the UserID and try again.
                </div>
              )}
              {verificationStatus === "Low" && (
                <div className="mt-4 text-yellow-500">
                  Low Balance.
                </div>
              )}
              {verificationStatus === "error" && (
                <div className="mt-4 text-red-500">
                  An error occurred while verifying the UserID. Please try again later.
                </div>
              )}
            </TabsContent>
            <TabsContent value="Receive">
              <Card>
                <CardHeader>
                  <CardTitle>Receive Amount</CardTitle>
                  <CardDescription>Receive Money Via QR or User_ID</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-lg">Order Oe31b70H</span>
                    <span className="text-lg">
                      <Share />
                    </span>
                  </div>
                  <div className="h-20"></div>
                  <span className="text-lg">QR Code</span>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardDescription>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
}