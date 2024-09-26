import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import axios from "axios";

const prisma = new PrismaClient();
const today = new Date();

// GET Request: Fetch user data, balance, and transaction summary
export async function GET(req: NextRequest) {
  const em: string | null = req.nextUrl.searchParams.get("id");

  if (!em) {
    return NextResponse.json({ message: "Email parameter is missing" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: em },
    });

    if (!existingUser || !existingUser.userID) {
      return NextResponse.json({ message: "User not found" }, { status: 403 });
    }

    const userid = existingUser.userID;

    const existingAccount = await prisma.account.findFirst({
      where: { userID: userid },
    });

    if (!existingAccount) {
      return NextResponse.json({ message: "Account not found" }, { status: 403 });
    }

    let transactionscount = 0;
    let creditedamt = 0;
    let debitedamt = 0;

    await prisma.$transaction(async (tx) => {
      transactionscount = await tx.transactions.count({
        where: {
          OR: [{ Sender_Id: userid }, { Receiver_Id: userid }],
        },
      });

      const creditedResult = await tx.transactions.aggregate({
        _sum: {
          Amount: true,
        },
        where: {
          Receiver_Id: userid,
        },
      });

      const debitedResult = await tx.transactions.aggregate({
        _sum: {
          Amount: true,
        },
        where: {
          Sender_Id: userid,
        },
      });

      creditedamt = creditedResult._sum.Amount ?? 0;
      debitedamt = debitedResult._sum.Amount ?? 0;
    });

    return NextResponse.json({
      email: existingUser.email,
      user: existingUser.userID,
      Accountno: existingAccount.Account_number,
      Balance: existingAccount.Balance,
      Transactions: transactionscount,
      Credit: creditedamt,
      Debit: debitedamt,
    });
  } catch (error) {
    console.error("Internal Server Error: ", error);
    return NextResponse.json(
      { message: "Oops, some error occurred 😓" },
      { status: 500 }
    );
  }
}

// POST Request: Handle Transaction
export async function POST(Req: NextRequest, Res: NextResponse) {
  try {
    const req = await Req.json();
    const { Sender_Id, Receiver_Id, Amount, Category, PIN } = req;

    if (!Sender_Id) throw new Error("Sender_Id is Required");
    if (!Receiver_Id) throw new Error("Receiver_Id is Required");
    if (!Amount) throw new Error("Amount is Required");
    if (!Category) throw new Error("Category is Required");

    const parsedAmount = parseInt(Amount, 10); // Convert Amount to an integer

    if (isNaN(parsedAmount)) {
      throw new Error("Invalid amount. Must be a valid number.");
    }

    const userfromemail = await prisma.user.findFirst({
      where: {
        email: Sender_Id,
      },
    });

    if (!userfromemail?.userID) {
      throw new Error("User ID is missing");
    }

    const user = await prisma.account.findFirst({
      where: {
        userID: userfromemail.userID,
      },
    });

    if (!user || !user.PIN) {
      throw new Error("User not found or PIN not set.");
    }

    const storedHashedPin = user.PIN;
    const isMatch = await bcrypt.compare(PIN, storedHashedPin);

    if (!isMatch) {
      return NextResponse.json({ message: 'Incorrect Pin' }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      const receiverAccount = await tx.account.findFirst({
        where: {
          userID: Receiver_Id,
        },
      });

      if (!receiverAccount) {
        throw new Error("Receiver account not found");
      }
      if (!userfromemail?.userID) {
        throw new Error("User ID is missing");
      }
      const senderAccount = await tx.account.findFirst({
        where: {
          userID: userfromemail?.userID,
        },
      });

      if (!senderAccount) {
        throw new Error("Sender account not found");
      }

      if (senderAccount.Balance < parsedAmount) {
        throw new Error("Insufficient balance");
      }
      if (!userfromemail?.userID) {
        throw new Error("User ID is missing");
      }
      // Create transaction
      await tx.transactions.create({
        data: {
          Amount: parsedAmount,
          Sender_Id: userfromemail.userID,
          Receiver_Id: Receiver_Id,
          Category: Category,
        },
      });

      // Update sender's account (decrement balance)
      await tx.account.update({
        where: {
          Account_number: senderAccount.Account_number,
        },
        data: {
          Balance: {
            decrement: parsedAmount,
          },
        },
      });


      // Update receiver's account (increment balance)
      await tx.account.update({
        where: {
          Account_number: receiverAccount.Account_number,
        },
        data: {
          Balance: {
            increment: parsedAmount,
          },
        },
      });

      const recAccount = await tx.user.findFirst({
        where: {
          userID: Receiver_Id,
        },
      });
      await axios.post("/api/p/notify/transaction",{
        "message": "Notifications added successfully",
        "recipientEmail": recAccount?.email,
        "notifications": [
          {
            "title": "Payment Received",
            "amount": Amount,
            "username": senderAccount.userID,
            "timestamp": today,
            "viewed": false
          }
        ]
      })
    });

    return NextResponse.json({ message: 'Successful Transaction' }, { status: 201 });
  } catch (error) {
    console.error('Internal Server Error: ', error);
    return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
  }
}