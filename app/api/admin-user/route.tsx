import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from '@clerk/nextjs/server';
export async function GET(request: NextRequest) {
    try {
        const users = await sql`
        SELECT * FROM users INNER JOIN addresses ON
        addresses.user_id = users.id;
        `
        return NextResponse.json(
            {
                users: users
            }, { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 400 }
        );
    }
}
export async function getUserIdByEmail(email: string): Promise<string | null> {
    try {
        const users = await (clerkClient as any).users.getUserList({
            emailAddress: [email],
            limit: 1,
        });
        if (users.length === 0) return null;
        return users[0].id;
    } catch (error) {
        throw new Error(String(error));
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { data } = await request.json();
        const { ids } = data;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { message: 'At least one user ID must be provided!' },
                { status: 400 }
            );
        }
        for (const id of ids) {
            const result = await sql`SELECT email FROM users WHERE id = ${id}`;
            const email = result[0]?.email;
            if (email) {
                const clerkId = await getUserIdByEmail(email);
                if (clerkId) {
                    try {
                        await (clerkClient as any).users.deleteUser(clerkId);
                    } catch (clerkError) {
                        console.error(`Failed to delete Clerk user ${email}:`, clerkError);
                    }
                }
            }
            await sql`DELETE FROM addresses WHERE user_id = ${id}`;
            await sql`DELETE FROM users WHERE id = ${id}`;
        }
        return NextResponse.json(
            { message: 'All users deleted successfully!' },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 400 }
        );
    }
}