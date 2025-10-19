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
        const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email};
        `;
        if (existingUser.length > 0) {
            const user = existingUser[0];
            if (user.profilePicture !== imageUrl) {
                const updatedUser = await sql`
                    UPDATE users
                    SET profilePicture = ${imageUrl}, updated_at = NOW()
                    WHERE email = ${email}
                    RETURNING *;
                `;
                return NextResponse.json(
                    { user: updatedUser[0] },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                { user },
                { status: 200 }
            );
        }
        const createdUser = await sql`
            INSERT INTO users(email, displayName, profilePicture, created_at, updated_at)
            VALUES (${email}, ${fullName}, ${imageUrl || '/'}, NOW(), NOW())
            RETURNING *;
        `;
        return NextResponse.json(
            { user: createdUser[0] },
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