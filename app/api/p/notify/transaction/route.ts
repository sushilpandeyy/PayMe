import { redisClient, connectRedis } from '../../../../../lib/redis';
import { NextRequest, NextResponse } from 'next/server';

interface Notification {
    title: string;
    amount: number;
    username: string;
    timestamp: string;
    viewed: boolean;
}

interface NotificationEmail {
    recipientEmail: string;
    notifications: Notification[];
}

connectRedis();

export async function POST(req: NextRequest) {
    try {
        const body: NotificationEmail = await req.json();
        const { recipientEmail, notifications } = body;

        // Fetch existing notifications from Redis
        const existingNotificationsString: string | null = await redisClient.get(recipientEmail);

        // Parse the existing notifications if available, or initialize an empty array
        let existingNotifications: Notification[] = existingNotificationsString
            ? JSON.parse(existingNotificationsString)
            : [];

        // Add timestamp and viewed status to each new notification
        const newNotifications = notifications.map((notification) => ({
            ...notification,
            timestamp: new Date().toISOString(),
            viewed: false,
        }));
        let updatedNotifications = [...existingNotifications, ...newNotifications];
        await redisClient.set(recipientEmail, JSON.stringify(updatedNotifications), { EX: 3600 });

        return NextResponse.json({
            message: 'Notifications added successfully',
            recipientEmail,
            notifications: updatedNotifications,
        });
    } catch (error) {
        console.error('Error adding notifications:', error);
        return NextResponse.json({ error: 'Failed to add notifications' }, { status: 500 });
    }
}
// GET: Retrieve notifications from Redis
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const recipientEmail = url.searchParams.get('email');

        if (!recipientEmail) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Get the notifications from Redis
        const notifications = await redisClient.get(recipientEmail);

        if (notifications) {
            return NextResponse.json({
                message: 'Notifications retrieved successfully',
                recipientEmail,
                notifications: JSON.parse(notifications),
            });
        } else {
            return NextResponse.json({ message: 'No notifications found' });
        }
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return NextResponse.json({ error: 'Failed to retrieve notifications' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { recipientEmail } = body;

        if (!recipientEmail) {
            return NextResponse.json({ error: 'recipientEmail is required' }, { status: 400 });
        }

        // Fetch existing notifications from Redis
        const notificationsString: string | null = await redisClient.get(recipientEmail);
        let notifications: Notification[] = notificationsString ? JSON.parse(notificationsString) : [];

        if (notifications.length === 0) {
            return NextResponse.json({ message: 'No notifications found to update' }, { status: 404 });
        }

        // Mark all notifications as viewed
        notifications = notifications.map(notification => ({
            ...notification,
            viewed: true,
        }));

        // If more than 5 notifications, remove oldest viewed notifications
        if (notifications.length > 5) {
            // Sort notifications by timestamp (oldest first) and filter viewed notifications
            const viewedNotifications = notifications.filter(n => n.viewed);
            const unviewedNotifications = notifications.filter(n => !n.viewed);

            // Sort by oldest first (ISO date strings can be compared directly)
            viewedNotifications.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

            // Remove excess viewed notifications if the total count exceeds 5
            while (viewedNotifications.length + unviewedNotifications.length > 5) {
                viewedNotifications.shift(); // Remove the oldest viewed notification
            }

            // Combine back both viewed and unviewed notifications
            notifications = [...unviewedNotifications, ...viewedNotifications];
        }

        // Update the notifications in Redis
        await redisClient.set(recipientEmail, JSON.stringify(notifications), { EX: 3600 });

        return NextResponse.json({
            message: 'All notifications marked as viewed, extra viewed notifications removed',
            notifications,
        });
    } catch (error) {
        console.error('Error marking notifications as viewed:', error);
        return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
    }
}

// DELETE: Delete all notifications for a user
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const recipientEmail = url.searchParams.get('email');

        if (!recipientEmail) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Delete the notifications from Redis
        await redisClient.del(recipientEmail);

        return NextResponse.json({
            message: 'Notifications deleted successfully',
            recipientEmail,
        });
    } catch (error) {
        console.error('Error deleting notifications:', error);
        return NextResponse.json({ error: 'Failed to delete notifications' }, { status: 500 });
    }
}