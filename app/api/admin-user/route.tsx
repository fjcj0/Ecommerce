import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
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
export async function DELETE(request: NextRequest) {
    try {
        const { data } = await request.json();
        const { ids } = data;
        if (!ids) return NextResponse.json(
            {
                message: 'At least one id of user to delete it!!'
            }, { status: 400 }
        );
        for (const id of ids) {
            await sql`DELETE FROM addresses WHERE user_id = ${id}`;
            await sql`DELETE FROM users WHERE id = ${id}`;
        }
        return NextResponse.json(
            {
                message: 'All users deleted successfully!!'

            },
            {
                status: 200
            }
        )
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 400 }
        );
    }
}