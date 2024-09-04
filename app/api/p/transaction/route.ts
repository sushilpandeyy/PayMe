import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { userID, PIN, Email } = req;
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
        await prisma.user.update({
            where: {
                email: Email,
            },
            data: {
                userID: userID,
            },
        });
        return NextResponse.json({ message: "Account Created" }, { status: 201 });
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}

