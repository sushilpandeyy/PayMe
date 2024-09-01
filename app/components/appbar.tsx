"use client";

import { useSession } from "next-auth/react";

const Logg = () => {
    const { data: session } = useSession();

    return (
        <>
            <div>
                {session ? (
                    <p>Welcome, {session.user?.name}</p>
                ) : (
                    <p>Please log in</p>
                )}
            </div>
        </>
    );
};

export default function Appbar() {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-4xl">
                PayMe
            </h1>
            <div>
                <Logg />
            </div>
        </div>
    );
}