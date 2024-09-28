import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Provider } from "../provider";
import Appbar from "../components/appbar";
import Navbar from "../components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <Appbar/>
        <Navbar selected="Transfer" />
        {children}
        </Provider>
        </body>
    </html>
  );
}
