import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from 'axios';
import { useSession } from "next-auth/react";
import "../globals.css";
import OpenAccount from "./Openaccount";
import CreditCard from "./CreditCard"; 
import { redirect } from "next/navigation";

interface Accounttype {
  Account_number: string; 
  Account_Holder: string;
  UserID: string;
}

export default function AccountCreate() {
  const [accountStatus, setAccountStatus] = useState<Accounttype | "loading" | "no">("loading");
  const { data: sessioninfo, status: sessionStatus } = useSession();

  useEffect(() => {
    async function fetchAccount() {
      if (sessionStatus === "authenticated") {
        try {
          const response = await axios.get(`/api/p/user/account?email=${sessioninfo?.user?.email}`);
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
    }

    if (sessionStatus !== "loading") {
      fetchAccount();
    }
  }, [sessioninfo, sessionStatus]);

  function Red() {
    redirect("/openacc");
    return (
      <>
        <OpenAccount />
      </>
    );
  }

  return (
    <Card className="p-4 h-max">
      <CardContent>
        <div className="flex content-center justify-center">
          {sessionStatus === "loading" || accountStatus === "loading" ? (
            <div>Loading...</div>
          ) : accountStatus === "no" ? (
            <Red />
          ) : (
            <CreditCard account={accountStatus} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}