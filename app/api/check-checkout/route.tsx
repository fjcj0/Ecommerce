import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { productId, userId } = await request.json();
        if (!productId || !userId) {
            return NextResponse.json(
                {
                    error: 'productId and userId are required fields!!'
                },
                { status: 400 }
            );
        }
        const result = await sql`
            SELECT * FROM checkouts 
            WHERE shoe_id = ${productId} AND user_id = ${userId};
        `;
        const isExist = result.length > 0;
        return NextResponse.json(
            {
                isExist: isExist,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Internal server error'
            },
            { status: 500 }
        );
    }
}