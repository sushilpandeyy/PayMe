import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { pages } from "next/dist/build/templates/app-page";
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.Google_CID ?? "",
            clientSecret: process.env.Google_Client ?? ""
        }),
    //  CredentialsProvider({
    //      name: 'Email',
    //      credentials: {
    //        email: {label: "Email id", type: "Email", placeholder: "John@doe.com"},
    //        password: { label: "Password", type: "password" }
    //      },
    //      // TODO: User credentials type from next-aut
    //      async authorize(credentials: any) {
    //        // Do zod validation, OTP validation here
    //        const hashedPassword = await bcrypt.hash(credentials.password, 10);
    //        const existingUser = await db.user.findFirst({
    //            where: {
    //                email: credentials.email
    //            }
    //        });//

    //        if (existingUser) {
    //          if (existingUser.password && typeof existingUser.password === 'string') {
    //            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
    //            if (passwordValidation) {
    //                return {
    //                    id: existingUser.id.toString(),
    //                    name: existingUser.name,
    //                    email: existingUser.email
    //                }
    //            }
    //            return null;
    //          }
    //        }//

    //        try {
    //            const user = await db.user.create({
    //                data: {
    //                    email: credentials.email,
    //                    password: hashedPassword
    //                }
    //            });
    //        
    //            return {
    //                id: user.id.toString(),
    //                name: user.name,
    //                email: user.email
    //            }
    //        } catch(e) {
    //            console.error(e);
    //        }//

    //        return null
    //      },
    //    })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
      async signIn({ user, account, profile }:{
        user: any;
      account: any;
      profile?: any;
      }) {
        if (!user.email) {
          throw new Error("Email is required for sign-in");
        }
  
        const existingUser = await db.user.findFirst({
          where: { email: user.email },
        });
  
        if (!existingUser) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name || "User",
              auth_type: "user",
              image: user.image || "",
              password: "Google"
            },
          });
        } else {
          await db.user.update({
            where: { email: user.email },
            data: {
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            },
          });
        }
  
        return true;
      },
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
 