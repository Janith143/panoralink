import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const ticketSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    category: z.enum(['SUPPORT', 'SALES', 'PARTNERSHIP']),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = ticketSchema.parse(body);

        // Generate a simple ticket ID (TKT-Timestamp-Random)
        const ticketId = `TKT-${Date.now().toString().slice(-4)}-${Math.floor(Math.random() * 1000)}`;

        const ticket = await prisma.ticket.create({
            data: {
                id: crypto.randomUUID(),
                ...validatedData,
                ticketId,
                updatedAt: new Date(),
            },
        });

        // Send email notification
        const settings = await prisma.setting.findMany({
            where: { key: { in: ['notification_email', 'contact_email'] } }
        });
        const notificationEmail = settings.find((s: any) => s.key === 'notification_email')?.value;

        if (notificationEmail) {
            const { sendEmail } = await import('@/lib/email');
            await sendEmail({
                to: notificationEmail,
                subject: `New Ticket: ${validatedData.subject} [${ticketId}]`,
                text: `
New Support Ticket Received

ID: ${ticketId}
Name: ${validatedData.name}
Email: ${validatedData.email}
Priority: ${validatedData.priority}
Category: ${validatedData.category}

Message:
${validatedData.message}
                `,
            });
        }

        return NextResponse.json({ success: true, ticketId: ticket.ticketId }, { status: 201 });
    } catch (error) {
        console.error('Ticket creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create ticket' },
            { status: 500 }
        );
    }
}
