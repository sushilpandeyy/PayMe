import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../globals.css";
import OpenAccount from "./Openaccount";
import CreditCard from "./CreditCard"; 

interface AccountType {
  Account_number: string; 
  Account_Holder: string;
  UserID: string;
}

export default function AccountCreate() {
  const [accountStatus, setAccountStatus] = useState<AccountType | "loading" | "no">("loading");
  const { data: sessioninfo, status: sessionStatus } = useSession();
  const router = useRouter(); 

  useEffect(() => {
    async function fetchAccount() {
      if (sessionStatus === "authenticated") {
        const cachedAccount = sessionStorage.getItem("accountData");
        if (cachedAccount) {
          // Use cached data if available
          setAccountStatus(JSON.parse(cachedAccount));
        } else {
          try {
            const response = await axios.get(`/api/p/user/account?email=${sessioninfo?.user?.email}`);
            if (response.data) {
              sessionStorage.setItem("accountData", JSON.stringify(response.data)); // Cache response in sessionStorage
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
    }

    if (sessionStatus !== "loading") {
      fetchAccount();
    }
  }, [sessioninfo, sessionStatus]);

  useEffect(() => {
    if (accountStatus === "no") {
      router.push("/openacc");
    }
  }, [accountStatus, router]);

  return (
    <Card className="p-4 h-max">
      <CardContent>
        <div className="flex content-center justify-center">
          {sessionStatus === "loading" || accountStatus === "loading" ? (
            <div>Loading...</div>
          ) : (
            accountStatus !== "no" && <CreditCard account={accountStatus} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
