"use client";

import { useSession } from "next-auth/react";
import { Provider } from "../provider";
import { Avatar,AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Loginbtn from "./ui/Loginbtn";
import { Logindrop } from "./ui/Loginbtn";


const Logg = () => {
    const { data: session } = useSession();
    const img = session?.user?.image || "https://github.com/shadcn.png";
    return (
        <>
            <div>
                {session ? (
                  <Logindrop>
                  <Avatar>
                    <AvatarImage src={img} alt={session?.user?.name || "Payme user"} className="rounded-full w-14 h-14" />
                    <AvatarFallback>{session?.user?.name}</AvatarFallback>
                  </Avatar>
                </Logindrop>
                ) : (
                    <Loginbtn/>
                )}
            </div>
        </>
    );
};

export default function Appbar() {
    return (
        <Provider>
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-4xl">
                PayMe
            </h1>
            <div>
                <Logg />
            </div>
        </div>
        </Provider>
    );
}