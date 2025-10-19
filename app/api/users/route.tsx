import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/config/db";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, fullName, imageUrl } = body;
        if (!email) {
            return NextResponse.json(
                { message: 'Unauthorized!!' },
                { status: 401 }
            );
        }
        const isExists = await sql`
            SELECT * FROM users WHERE email = ${email};
        `;
        if (isExists.length > 0) {
            return NextResponse.json({
                user: isExists[0]
            }, { status: 200 });
        }
        const created_User = await sql`
            INSERT INTO users(email, displayName, profilePicture, created_at, updated_at)
            VALUES (${email}, ${fullName}, ${imageUrl || '/'}, NOW(), NOW())
            RETURNING *;
        `;
        return NextResponse.json(
            { user: created_User[0] },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}