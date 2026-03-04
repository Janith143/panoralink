import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

function logOps(message: string) {
    try {
        const logFile = path.join(process.cwd(), 'auth-debug.log');
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
        console.log(message);
    } catch (e) {
        console.error('Logging failed:', e);
    }
}

async function getUser(email: string) {
    try {
        logOps(`Fetching user from DB: ${email}`);
        const user = await prisma.user.findUnique({ where: { email } });
        logOps(`DB Result for ${email}: ${user ? 'Found' : 'Not Found'}`);
        return user;
    } catch (error) {
        logOps(`DB Error: ${error}`);
        return null;
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    session: { strategy: 'jwt' },
    providers: [
        Credentials({
            async authorize(credentials) {
                logOps('Authorize called');
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    logOps(`Checking user: ${email}`);
                    const user = await getUser(email);
                    if (!user) {
                        logOps('User not found in DB');
                        return null;
                    }
                    logOps('User found, verifying password...');

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        logOps('Password match! Login success.');
                        return user;
                    }
                    logOps('Password mismatch.');
                } else {
                    logOps('Credential parsing failed');
                }

                logOps('Invalid credentials or parse error');
                return null;
            },
        }),
    ],
});
