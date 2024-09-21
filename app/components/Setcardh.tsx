"use client";
import React, { useEffect, useState } from "react";
import { TransactionsCard, TotalBalCard, InCard, OutCard } from "./TransCards";
import axios from "axios";

export default function Setcardh() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve session data from sessionStorage
      const cachedSession = sessionStorage.getItem("sessionData");
      if (cachedSession) {
        const sessionData = JSON.parse(cachedSession);
        
        // Retrieve transaction data if available in sessionStorage
        const cachedTransactionData = sessionStorage.getItem("transactionData");

        try {
          if (cachedTransactionData) {
            // Use cached transaction data if available
            setData(JSON.parse(cachedTransactionData));
          } else {
            // Fetch new transaction data
            const response = await axios.get(
              `api/p/transaction/account?id=${sessionData.user.email}`
            );
            const transactionData = response.data;
            
            // Cache the new transaction data
            sessionStorage.setItem("transactionData", JSON.stringify(transactionData));
            setData(transactionData);
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to load data");
          setLoading(false);
        }
      } else {
        setError("No session data available");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <TotalBalCard balance={data.Balance} user={data.user} />
      <TransactionsCard transactions={data.Transactions} />
      <InCard credit={data.Credit} />
      <OutCard debit={data.Debit} />
    </div>
  );
}

export function Headcards() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve session data from sessionStorage
      const cachedSession = sessionStorage.getItem("sessionData");
      if (cachedSession) {
        const sessionData = JSON.parse(cachedSession);
        
        // Retrieve transaction data if available in sessionStorage
        const cachedTransactionData = sessionStorage.getItem("transactionData");

        try {
          if (cachedTransactionData) {
            // Use cached transaction data if available
            setData(JSON.parse(cachedTransactionData));
          } else {
            // Fetch new transaction data
            const response = await axios.get(
              `api/p/transaction/account?id=${sessionData.user.email}`
            );
            const transactionData = response.data;
            
            // Cache the new transaction data
            sessionStorage.setItem("transactionData", JSON.stringify(transactionData));
            setData(transactionData);
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to load data");
          setLoading(false);
        }
      } else {
        setError("No session data available");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      <TotalBalCard balance={data.Balance} user={data.user} />
      <TransactionsCard transactions={data.Transactions} />
      <InCard credit={data.Credit} />
      <OutCard debit={data.Debit} />
    </div>
  );
}
