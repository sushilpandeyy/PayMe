import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import  qs from 'qs';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const rawParams = request.url.split('?')[1];
        const params = qs.parse(rawParams);
        const email = request.nextUrl.searchParams.get('email');
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
