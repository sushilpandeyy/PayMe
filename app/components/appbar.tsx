"use client";

import { useSession } from "next-auth/react";
import { Provider } from "../provider";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Loginbtn from "./ui/Loginbtn";
import { Logindrop } from "./ui/Loginbtn";
import { useEffect, useState } from "react";
import Notification from "./ui/Notification";

const Logg = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [cachedSession, setCachedSession] = useState<any>(null);

    useEffect(() => {
        const cachedSessionData = sessionStorage.getItem("sessionData");
        if (cachedSessionData) {
            setCachedSession(JSON.parse(cachedSessionData)); // Use cached session data
        }

        if (sessionStatus === "authenticated" && session) {
            sessionStorage.setItem("sessionData", JSON.stringify(session));
            setCachedSession(session); // Update the cached session state
        }
    }, [session, sessionStatus]);

    // Use the cached session if available, otherwise use the session from useSession hook
    const displaySession = cachedSession || session;
    const img = displaySession?.user?.image || "https://github.com/shadcn.png";

    return (
        <>
            <div>
                {displaySession ? (
                    <Logindrop>
                        <Avatar>
                            <AvatarImage src={img} alt={displaySession?.user?.name || "Payme user"} className="rounded-full w-14 h-14" />
                            <AvatarFallback>{displaySession?.user?.name}</AvatarFallback>
                        </Avatar>
                    </Logindrop>
                ) : (
                    <Loginbtn />
                )}
            </div>
        </>
    );
};

export default function Appbar() {
    return (
        <Provider>
            <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-4xl">PayMe</h1>
                <div className="flex  justify-between items-center">
                    <div className="mr-4">
                   <Notification/>
                    </div>
                    <Logg />
                </div>
            </div>
        </Provider>
    );
}
