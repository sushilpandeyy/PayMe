import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

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
            return NextResponse.json({ message: "Found User", user }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Account Not Created' }, { status: 401 });
        }
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}