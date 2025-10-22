import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/config/db";
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Id is required!" }, { status: 400 });
        }
        const userId = request.headers.get("x-user-id");
        let reviews;
        if (userId) {
            reviews = await sql`
                SELECT * FROM reviews
                INNER JOIN users ON users.id = reviews.user_id
                WHERE reviews.shoe_id = ${parseInt(id)} AND reviews.user_id != ${parseInt(userId)};
            `;
        } else {
            reviews = await sql`
                SELECT * FROM reviews
                INNER JOIN users ON users.id = reviews.user_id
                WHERE reviews.shoe_id = ${parseInt(id)};
            `;
        }
        return NextResponse.json({ reviews: reviews }, { status: 200 });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}