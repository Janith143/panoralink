import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const subscribeSchema = z.object({
    email: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = subscribeSchema.parse(body);

        // 1. Save to Database (Upsert to avoid duplicates)
        await prisma.subscriber.upsert({
            where: { email },
            update: {},
            create: { email },
        });

        // 2. Fetch Notification Email Setting
        const settings = await prisma.setting.findMany({
            where: { key: { in: ['notification_email', 'contact_email'] } }
        });
        const notificationEmail = settings.find((s: any) => s.key === 'notification_email')?.value;

        // 3. Send Notification to Admin
        if (notificationEmail) {
            const { sendEmail } = await import('@/lib/email');
            await sendEmail({
                to: notificationEmail,
                subject: `New Newsletter Subscriber: ${email}`,
                text: `A new user has subscribed to the newsletter: ${email}`,
            });
        }

        return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 201 });
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to subscribe' },
            { status: 500 }
        );
    }
}
