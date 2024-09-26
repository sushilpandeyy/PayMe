"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface NotificationItem {
  title: string;
  amount: number;
  username: string;
  timestamp: string;
  viewed: boolean;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get email from session storage
    const sessionData = sessionStorage.getItem("sessiondata");
    const email = sessionData ? JSON.parse(sessionData).email : null;

    if (email) {
      // Fetch notifications from the API
      fetch(`http://localhost:3000/api/notify/transaction?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.notifications) {
            setNotifications(data.notifications);
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {loading ? (
            <DropdownMenuItem>Loading...</DropdownMenuItem>
          ) : notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <DropdownMenuItem key={index} className="flex flex-col">
                <span>{notification.title}</span>
                <span className="text-xs text-gray-500">
                  {notification.timestamp}
                </span>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem>No notifications</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/transfer">Transfer Money</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
