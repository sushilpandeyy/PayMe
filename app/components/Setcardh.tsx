"use client";
import React, { useEffect, useState } from "react";
import { TransactionsCard, TotalBalCard, InCard, OutCard } from "./TransCards";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Setcardh() {
  const { data: session, status } = useSession();  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {   
        try {
          const response = await axios.get('api/p/transaction/account?id=' + session?.user?.email);
          setData(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to load data");
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading session...</div>;  
  }

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <TotalBalCard balance={data.Balance} user={data.user} />
        <TransactionsCard transactions={data.Transactions} />
        <InCard credit={data.Credit} />
        <OutCard debit={data.Debit} />
      </div>
    </>
  );
}

export function Headcards(){

  const { data: session, status } = useSession(); // Get session status and data
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {   
        try {
          const response = await axios.get('api/p/transaction/account?id=' + session?.user?.email);
          setData(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to load data");
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading session...</div>;   
  }

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return <div className="grid grid-cols-4 gap-4 w-full">
    <TotalBalCard balance={data.Balance} user={data.user} />
    <TransactionsCard transactions={data.Transactions} />
    <InCard credit={data.Credit} />
    <OutCard debit={data.Debit} />
</div>
}