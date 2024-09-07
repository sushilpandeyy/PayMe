import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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

//Transaction POST API

export async function POST(Req:NextRequest, Res: NextResponse){
  try {
    const req = await Req.json();
    const { Sender_Id, Receiver_Id, Amount, Category, PIN } = req;
    if (!Sender_Id) {
        throw new Error("Sender_Id is Required");
    }
    if (!Receiver_Id) {
      throw new Error("Receiver_Id is Required");
  }
  if (!Amount) {
    throw new Error("Amount is Required");
}
if (!Category) {
  throw new Error("Category is Required");
}
const user = await prisma.account.findFirst({
  where: {
    userID: Sender_Id,
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
  const result = await tx.account.findFirst({
    where: {
      userID: Receiver_Id,
    },
  });
  const bal: number = result ? result.Balance : 0;

  await tx.transactions.create({
      data: {
          Amount: bal,
          Sender_Id: Sender_Id,
          Receiver_Id: Receiver_Id,
          Category: Category,
      },
  });
});
return NextResponse.json({ message: 'Sucessfull Transaction' }, { status: 201 });
} catch (error) {
    console.error('Internal Server Error: ', error);
    return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
}
}