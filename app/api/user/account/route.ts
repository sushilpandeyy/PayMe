import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");
        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user?.userID) {
            const account = await prisma.account.findFirst({
                where: {
                    userID: user?.userID
                },
            });
            if(account){
               return NextResponse.json({
                    Account_number: account.Account_number,
                    Account_Holder: user?.name,
                    UserID: account.userID
                }, { status: 200 })
            }
        } else {
            return NextResponse.json({ message: 'Account Not Created' }, { status: 401 });
        }
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}

function generateRandom16DigitNumber(): string {
    let randomNumber: string = '';
  
    for (let i = 0; i < 16; i++) {
      const digit: number = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
      randomNumber += digit.toString();
    }
  
    return randomNumber;
  }

  export async function POST(request: NextRequest) {
    try {
        const req = await request.json(); // Await the JSON parsing
        const { userID, PIN, Email } = req;

        if (!Email) {
            throw new Error("Email is Required");
        }

        const existingUser = await prisma.user.findFirst({
            where: { email: Email },
        });

        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const hashedPin = await bcrypt.hash(PIN.toString(), 10);

        await prisma.user.update({
            where: {
                email: Email,
            },
            data: {
                userID: userID,
            },
        });
        await prisma.account.create({
            data: {
                Account_number: generateRandom16DigitNumber(),
                userID: userID,
                Balance: 0,
                PIN: hashedPin,  
            },
        });


        return NextResponse.json({ message: "Account Created" }, { status: 201 });
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}