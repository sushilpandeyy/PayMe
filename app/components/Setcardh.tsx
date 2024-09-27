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

        try {
          // Fetch the latest transaction data
          const response = await axios.get(
            `api/p/transaction/account?id=${sessionData.user.email}`
          );
          const newTransactionData = response.data;

          // Retrieve transaction data from sessionStorage
          const cachedTransactionData = sessionStorage.getItem("transactionData");

          // Check if the cached data exists and matches the newly fetched data
          if (cachedTransactionData) {
            const storedTransactionData = JSON.parse(cachedTransactionData);

            // Compare the cached data and new data (using a simple deep equality check)
            const isDataSame = JSON.stringify(storedTransactionData) === JSON.stringify(newTransactionData);

            if (!isDataSame) {
              // If data is different, clear session storage and re-render the page with new data
              sessionStorage.removeItem("transactionData");
              setData(newTransactionData);
              sessionStorage.setItem("transactionData", JSON.stringify(newTransactionData));
            } else {
              // If data is the same, use the cached data
              setData(storedTransactionData);
            }
          } else {
            // If no cached data, store and set the new transaction data
            setData(newTransactionData);
            sessionStorage.setItem("transactionData", JSON.stringify(newTransactionData));
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

        try {
          // Fetch the latest transaction data
          const response = await axios.get(
            `api/p/transaction/account?id=${sessionData.user.email}`
          );
          const newTransactionData = response.data;

          // Retrieve transaction data from sessionStorage
          const cachedTransactionData = sessionStorage.getItem("transactionData");

          // Check if the cached data exists and matches the newly fetched data
          if (cachedTransactionData) {
            const storedTransactionData = JSON.parse(cachedTransactionData);

            // Compare the cached data and new data (using a simple deep equality check)
            const isDataSame = JSON.stringify(storedTransactionData) === JSON.stringify(newTransactionData);

            if (!isDataSame) {
              // If data is different, clear session storage and re-render the page with new data
              sessionStorage.removeItem("transactionData");
              setData(newTransactionData);
              sessionStorage.setItem("transactionData", JSON.stringify(newTransactionData));
            } else {
              // If data is the same, use the cached data
              setData(storedTransactionData);
            }
          } else {
            // If no cached data, store and set the new transaction data
            setData(newTransactionData);
            sessionStorage.setItem("transactionData", JSON.stringify(newTransactionData));
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