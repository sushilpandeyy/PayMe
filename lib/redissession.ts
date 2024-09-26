import { redisClient } from './redis';

const SESSION_TTL = 3600;

interface Notification {
    title: string;
    amount: number;
    username: string;
}
interface NotificationEmail {
    recipientEmail: string;
    notifications: Notification[];
}

export const createSession = async (session: NotificationEmail) => {
    try {
        await redisClient.set(session.recipientEmail, JSON.stringify(session), {
            EX: SESSION_TTL,
        });
        console.log(`Session created for user ${session.recipientEmail}`);
    } catch (err) {
        console.error('Error creating session:', err);
    }
};

export const getSession = async (sessionId: string): Promise<NotificationEmail | null> => {
    try {
        const session = await redisClient.get(sessionId);
        return session ? JSON.parse(session) : null;
    } catch (err) {
        console.error('Error fetching session:', err);
        return null;
    }
};

export const deleteSession = async (recipientEmail: string): Promise<void> => {
    try {
        await redisClient.del(recipientEmail);
        console.log(`Session ${recipientEmail} deleted`);
    } catch (err) {
        console.error('Error deleting session:', err);
    }
};