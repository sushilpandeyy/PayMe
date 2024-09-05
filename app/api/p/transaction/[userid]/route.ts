import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
    const { userid } = params;

    try {
        const existingUser = await prisma.user.findFirst({
            where: { userID: userid },
        });
        const existingAccount = await prisma.account.findFirst({
            where: { userID: userid },
        });
        if (!existingUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 403 });
        }

        let transactionscount = 0;
        let creditedamt = 0;
        let debitedamt = 0;

        await prisma.$transaction(async (tx) => {
            transactionscount = await tx.transactions.count({
                where: {
                    OR: [
                        { Sender_Id: userid },
                        { Receiver_Id: userid },
                    ],
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
            "user": existingUser.userID,
            "Accountno": existingAccount?.Account_number,
            "Balance": existingAccount?.Balance,
            "Transactions": transactionscount,
            "Credit": creditedamt,
            "Debit": debitedamt
        });

    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}