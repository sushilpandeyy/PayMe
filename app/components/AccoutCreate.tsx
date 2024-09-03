"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from 'axios';
import { useSession } from "next-auth/react";
import "../globals.css";
import { Button } from "@/components/ui/button";
import { CreditCardIcon } from "lucide-react";

const CreditCard: React.FC = () => {
  return (
    <div className="relative w-80 h-48 p-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-2xl text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="shiny"></div>
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -right-16 w-60 h-60 bg-gradient-to-br from-gray-600 to-gray-900 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-16 w-60 h-60 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-10 rounded-xl"></div>
      <div className="relative z-10">
        <div className="text-lg font-semibold">John Doe</div>
        <div className="text-sm tracking-widest mt-2">**** **** **** 1234</div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <div className="text-xs">Valid Thru</div>
            <div className="text-sm">12/24</div>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-filter backdrop-blur-md">
            <span className="font-bold text-lg">PayMe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AccountCreate() {
  const [accountStatus, setAccountStatus] = useState<string>("loading");
  const sessioninfo=useSession();

  useEffect(() => {
    async function fetchAccount() {
      try {
        const response = await axios.get(`/api/user/account?email=${sessioninfo.data?.user?.email}`);
        if (response.data) {
          setAccountStatus("exists");
        } else {
          setAccountStatus("no");
        }
      } catch (error) {
        console.log(error);
        setAccountStatus("no");
      }
    }

    fetchAccount();
  }, []);
  return (
    <Card className="p-4 h-max">
      <CardContent>
        <div className="flex content-center justify-center">
          {accountStatus === "loading" ? (
            <div>Loading...</div>
          ) : accountStatus === "no" ? (
            <Button>
                <CreditCardIcon
                />Open Account
            </Button>
          ) : (
            <CreditCard />
          )}
        </div>
      </CardContent>
    </Card>
  );
}