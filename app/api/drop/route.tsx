import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const pass = request.nextUrl.searchParams.get("password");

        if (!id || !pass) {
            throw new Error("ID & Password are Required");
        }

        if (pass !== process.env.DROPPASS) {
            return NextResponse.json({ message: 'PASSWORD IS WRONG' }, { status: 404 });
        }

        const existingUser = await prisma.account.findFirst({
            where: { userID: id },
        });

        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        await prisma.$transaction(async (tx) => {
            await tx.account.update({
                where: {
                    Account_number: existingUser.Account_number,
                },
                data: {
                    Balance: existingUser.Balance + 10000, // Ensure Balance is a numeric type
                },
            });

            await tx.transactions.create({
                data: {
                    Amount: 10000,
                    Sender_Id: "Drop_Payme",
                    Receiver_Id: existingUser.userID,
                    Category: "Drop",
                },
            });

            await tx.drop.create({
                data: {
                    Receiver_id: existingUser.userID,
                },
            });
        });

        return NextResponse.json({ message: "Drop Added" }, { status: 200 });

    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}