import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
    request: NextRequest,
    context: { params: { userId: string; productId: string } }
) {
    try {
        const { userId, productId } = context.params;
        if (!userId || !productId) {
            return NextResponse.json(
                {
                    error: 'userId and Product Id are required!!'
                }, {
                status: 400
            }
            );
        }
        await sql`
         DELETE FROM reviews
         WHERE reviews.shoe_id = ${productId} AND reviews.user_id = ${userId};
        `;
        return NextResponse.json(
            { message: `Product ${productId} for user ${userId} deleted successfully` },
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