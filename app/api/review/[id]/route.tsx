import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "Id is required!!" },
                { status: 400 }
            );
        }
        const reviews = await sql`
      SELECT * FROM reviews
      INNER JOIN users ON users.id = reviews.user_id
      WHERE reviews.shoe_id = ${id};
    `;
        return NextResponse.json({ reviews }, { status: 200 });
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 400 }
        );
    }
}