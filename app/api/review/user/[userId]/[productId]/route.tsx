import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string; productId: string }> }
) {
    try {
        const { userId, productId } = await params;
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
         WHERE reviews.shoe_id = ${parseInt(productId)} AND reviews.user_id = ${parseInt(userId)};
        `;
        return NextResponse.json(
            { message: `Product ${productId} for user ${userId} deleted successfully` },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string; productId: string }> }
) {
    try {
        const { userId, productId } = await params;
        if (!userId || !productId) {
            return NextResponse.json(
                {
                    error: 'userId and Product Id are required!!'
                }, {
                status: 400
            });
        }
        const userReview = await sql`
        SELECT reviews.*,users.*
        FROM reviews INNER JOIN users ON 
        users.id = reviews.user_id
        WHERE reviews.user_id = ${parseInt(userId)} AND reviews.shoe_id = ${parseInt(productId)};
        `;
        return NextResponse.json(
            {
                userReview: userReview[0],
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}