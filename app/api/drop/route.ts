import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();



export async function POST(req: NextRequest, res: NextResponse) {
    try {
      // Parse request body
      const { email, PIN } = await req.json();
      
      if (!email) throw new Error("Email is Required");
      if (!PIN) throw new Error("PIN is Required");
  
      // Find user by email
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
  
      if (!user?.userID) {
        throw new Error("User not found");
      }
  
      // Find user's account
      const account = await prisma.account.findFirst({
        where: {
          userID: "dropbox",
        },
      });
  
      if (!account || !account.PIN) {
        throw new Error("User account or PIN not found.");
      }
  
      // Check PIN
      const storedHashedPin = account.PIN;
      const isMatch = await bcrypt.compare(PIN, storedHashedPin);
  
      if (!isMatch) {
        return NextResponse.json({ message: 'Incorrect Pin' }, { status: 401 });
      }
  
      // Create transaction
      await prisma.transactions.create({
        data: {
          Amount: 10000,
          Sender_Id: 'dropbox', 
          Receiver_Id: user.userID,
          Category: 'Drop Money',
        },
      });
      const accounti = await prisma.account.findFirst({
        where: {
          userID: user.userID
        }
      });
      await prisma.account.update({
        where: {
         Account_number: accounti?.Account_number
        },
        data: {
          Balance: {
            increment: 10000,  
          },
        },
      });
  
      return NextResponse.json({ message: 'Successful Transaction' }, { status: 201 });
    } catch (error) {
      console.error('Internal Server Error: ', error);
      return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
  }