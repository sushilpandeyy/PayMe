import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
       
    } catch (error) {
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}

//Gets Transaction from a Specific Date to a Specific Date 
export async function POST(req: NextRequest, res: NextResponse){
    const bodydata = await req.json();
    const {startdate, enddate, mail} = bodydata;
    if (!startdate) throw new Error("Startdate is Required");
    if (!enddate) throw new Error("End date is Required");
    if(!mail) throw new Error("mail is Required");
    try {
        const usernamedata = await prisma.user.findFirst({
            where: {
              email: mail,
            },
          });
          if(!usernamedata) throw new Error("user does not exsists");
          const datatransaction = await prisma.transactions.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                Sender_Id: usernamedata?.userID || ""
                            },
                            {
                                Receiver_Id: usernamedata?.userID || ""
                            }
                        ]
                    },
                    {
                        createdAt: {
                            gte: new Date(startdate).toISOString(),  
                            lte: new Date(enddate).toISOString()     
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc' 
            }
        });
        return NextResponse.json({data: datatransaction, username: usernamedata.userID}, {status: 200})
    }
    catch(error){
        console.error('Internal Server Error: ', error);
        return NextResponse.json({ message: 'Oops, some error occurred 😓' }, { status: 500 });
    }
}