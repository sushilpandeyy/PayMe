"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell } from "lucide-react";
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
    const fetchNotifications = async (email: string) => {
      try {
        const response = await axios.get(`/api/notify/transaction?email=`+email);
        console.log(response.data)
        if (response.data.notifications) {
          setNotifications(response.data.notifications);
        } else {
          setNotifications([]); // Set to empty if no notifications
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    // Ensure this runs client-side
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("sessiondata");
      let email = null;

      try {
        if (sessionData) {
          const parsedData = JSON.parse(sessionData);
          email = parsedData?.user?.email || null;
          console.log(email)
        }
      } catch (error) {
        console.error("Error parsing session data:", error);
      }

      if (email) {
        fetchNotifications(email);
      } else {
        setLoading(false); // Stop loading if no email found
      }
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
                  {new Date(notification.timestamp).toLocaleString()}
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
