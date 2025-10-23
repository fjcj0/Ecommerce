import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const products = await sql`
            SELECT shoes.discount, shoes.title, shoes.description, shoes.id, (
                SELECT url FROM images
                WHERE images.shoe_id = shoes.id
                LIMIT 1
            ) as image_url
            FROM shoes
            ORDER BY shoes.id DESC
            LIMIT 6;
        `;
        return NextResponse.json(
            {
                products: products
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : error
            },
            { status: 500 }
        );
    }
}