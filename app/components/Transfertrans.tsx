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
} from "@/components/ui/dialog";

interface PinInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PinInputModal = ({ isOpen, onClose }: PinInputModalProps) => {
  const [pin, setPin] = useState<string>("");

  const handleDigitInput = (digit: string) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + digit);
    }
  };

  const handleBackspace = () => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      console.log("Submitted PIN:", pin);
      setPin("");
      onClose();
    } else {
      alert("Please enter a 4-digit PIN");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="text-center p-6">
        <DialogHeader>
          <DialogTitle>Enter Your 4-Digit PIN</DialogTitle>
        </DialogHeader>

        {/* PIN input */}
        <div className="flex justify-center items-center mb-4">
          <input
            type="password"
            value={pin}
            className="text-center text-3xl p-2 w-24 border-b-2 border-gray-500 text-black" // added 'text-black' here
            readOnly
            maxLength={4}
          />
        </div>

        {/* Classic Keyboard-like button layout with line breaks after 3 buttons */}
        <div className="flex flex-wrap justify-center max-w-[180px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <Button
              key={digit}
              variant="outline"
              className="text-2xl h-14 w-14 rounded-full flex justify-center items-center"
              onClick={() => handleDigitInput(digit.toString())}
            >
              {digit}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-14 w-14 rounded-full flex justify-center items-center"
            onClick={handleBackspace}
          >
            ⌫
          </Button>
          <Button
            variant="outline"
            className="text-2xl h-14 w-14 rounded-full flex justify-center items-center"
            onClick={() => handleDigitInput("0")}
          >
            0
          </Button>
          <Button
            className="h-14 w-14 rounded-full flex justify-center items-center"
            onClick={handleSubmit}
          >
            ✔
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Transfertrans() {
  const [userID, setUserID] = useState("");
  const [amount, setAmount] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verified" | "Low" | "notFound" | "error">("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSend = async () => {
    try {
      const response = await axios.get(`/api/p/transaction/verify?id=${userID}&amt=${amount}`);
      if (response.status === 200) {
        setVerificationStatus("verified");
        handleOpenModal();  // Open the PIN modal after verification
      } else if(response.status === 201){
        setVerificationStatus("Low");
      } else {
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
                  <CardDescription>Send money to any userID</CardDescription>
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

              {verificationStatus === "verified" && (
                <PinInputModal isOpen={isModalOpen} onClose={handleCloseModal} />
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