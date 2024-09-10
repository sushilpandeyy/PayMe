import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

// Force the API route to be dynamic
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const amtStr = request.nextUrl.searchParams.get("amt");

        if (!id) {
            console.error("User ID is required");
            return NextResponse.json({ message: 'User ID is required' }, { status: 401 });
        }

        if (!amtStr) {
            return NextResponse.json({ message: 'Amount is required' }, { status: 402 });
        }

        const amt = parseFloat(amtStr);
        if (isNaN(amt) || amt <= 0) {
            return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
        }

        const user = await prisma.account.findFirst({
            where: {
                userID: id,
            },
        });

        if (user?.userID) {
            if (user.Balance >= amt) {
                return NextResponse.json({ message: 'Account is there and balance is sufficient' }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Low balance' }, { status: 201 });
            }
        } else {
            return NextResponse.json({ message: 'UserID is not there' }, { status: 404 });
        }
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}