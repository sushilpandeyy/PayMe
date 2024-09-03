import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from 'axios';
import { useSession } from "next-auth/react";
import "../globals.css";
import OpenAccount from "./Openaccount";
import CreditCard from "./CreditCard"; 

interface Accounttype {
  Account_number: string; // Changed to lowercase 'string'
  Account_Holder: string;
  UserID: string;
}

export default function AccountCreate() {
  const [accountStatus, setAccountStatus] = useState<Accounttype | "loading" | "no">("loading");
  const { data: sessioninfo } = useSession();

  useEffect(() => {
    async function fetchAccount() {
      try {
        const response = await axios.get(`/api/user/account?email=${sessioninfo?.user?.email}`);
        if (response.data) {
          setAccountStatus(response.data);
        } else {
          setAccountStatus("no");
        }
      } catch (error) {
        console.log(error);
        setAccountStatus("no");
      }
    }

    fetchAccount();
  }, [sessioninfo]);

  return (
    <Card className="p-4 h-max">
      <CardContent>
        <div className="flex content-center justify-center">
          {accountStatus === "loading" ? (
            <div>Loading...</div>
          ) : accountStatus === "no" ? (
            <OpenAccount />
          ) : (
            <CreditCard account={accountStatus} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
