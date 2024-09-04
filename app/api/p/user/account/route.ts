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
                }, { status: 200 });
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
        const req = await request.json();
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
        const existingUserID = await prisma.user.findFirst({
            where: { userID: userID },
        });

        if (existingUserID) {
            return NextResponse.json({ message: 'UserID already exists' }, { status: 409 });
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


export async function PUT(request: NextRequest) {
    try {
        const req = await request.json();  
        const { userID, PIN, NewPin } = req;
        const existingAccount = await prisma.account.findFirst({
            where: { userID: userID },
        });
        if (!existingAccount) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const pinValidation = await bcrypt.compare(PIN, existingAccount.PIN);
        if (pinValidation) {
            const hashedPin = await bcrypt.hash(NewPin.toString(), 10);
            await prisma.account.update({
                where: {
                    Account_number: existingAccount.Account_number,  
                },
                data: {
                    PIN: hashedPin,  
                },
            });
            return NextResponse.json({ message: 'PIN updated successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'PIN does not match' }, { status: 206 });
        }
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}