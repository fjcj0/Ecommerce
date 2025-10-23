import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params;
        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required!!' },
                { status: 400 }
            );
        }
        const orders = await sql`
      SELECT 
        orders.*,
        shoes.title,
        (
          SELECT images.url 
          FROM images 
          WHERE images.shoe_id = shoes.id 
          ORDER BY images.id 
          LIMIT 1
        ) as image_url
      FROM orders
      INNER JOIN users ON users.id = orders.user_id
      INNER JOIN shoes ON shoes.id = orders.shoe_id
      WHERE users.id = ${userId}
      ORDER BY orders.created_at DESC;
    `;
        return NextResponse.json(
            { orders: orders },
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