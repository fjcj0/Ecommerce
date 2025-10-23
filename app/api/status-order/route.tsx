import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const {
            userId,
            productId,
            orderId,
            status,
            quantity,
            price
        } = await request.json();
        if (status == 'delivered') {
            await sql`
            INSERT INTO sales (user_id,shoe_id,order_id,quantity,price)
            VALUES (${userId},${productId},${orderId},${quantity},${price});
            `;
            await sql`
            UPDATE orders 
            SET status = ${status}
            WHERE id = ${orderId};
            `;
            return NextResponse.json(
                {
                    message: 'Order status changed successfully!!'
                }, { status: 201 }
            );
        }
        await sql`
            UPDATE orders 
            SET status = ${status}
            WHERE id = ${orderId};
            `;
        return NextResponse.json(
            {
                message: 'Order status changed successfully!!'
            }, { status: 201 }
        );
    } catch (error: unknown) {
        console.log(error)
    }
}