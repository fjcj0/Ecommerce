import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { checkouts } = await request.json();
        if (!checkouts || checkouts.length === 0) {
            return NextResponse.json(
                { error: "At least one checkout required!" },
                { status: 400 }
            );
        }
        const createdOrders = [];
        const skippedCheckouts: number[] = [];
        for (const checkout of checkouts) {
            const [shoe] = await sql`
        SELECT id, quantity, available 
        FROM shoes
        WHERE id = ${checkout.shoe_id};
      `;
            if (!shoe || !shoe.available || shoe.quantity < checkout.quantity) {
                await sql`
          DELETE FROM checkouts
          WHERE id = ${checkout.checkout_id};
        `;
                skippedCheckouts.push(checkout.checkout_id);
                continue;
            }
            const totalPrice = checkout.final_price ?? 0;
            const [order] = await sql`
        INSERT INTO orders (
          user_id, shoe_id, xs, s, m, l, xl,
          quantity, final_price, status
        )
        VALUES (
          ${checkout.user_id}, ${checkout.shoe_id},
          ${checkout.xs}, ${checkout.s}, ${checkout.m},
          ${checkout.l}, ${checkout.xl},
          ${checkout.quantity}, ${totalPrice}, 'pending'
        )
        RETURNING *;
      `;
            createdOrders.push(order);
            await sql`
        UPDATE shoes
        SET available = available - ${checkout.quantity}
        WHERE id = ${checkout.shoe_id};
      `;
            await sql`
        DELETE FROM checkouts WHERE id = ${checkout.checkout_id};
      `;
        }
        return NextResponse.json(
            {
                message: "Orders processed successfully!",
                createdOrders,
                skippedCheckouts,
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { ids } = await request.json();
        for (const id of ids) {
            await sql`
            DELETE FROM orders
            WHERE id = ${id};
            `;
        }
        return NextResponse.json(
            {
                message: 'Orders are deleted successfully!!'
            }, { status: 200 }
        )
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : error
            }, { status: 500 }
        );
    }
}
export async function GET(request: NextRequest) {
    try {
        const orders = await sql`
        SELECT 
            orders.*, 
            shoes.title,
            shoes.available,
            (
                SELECT images.url 
                FROM images 
                WHERE images.shoe_id = shoes.id 
                ORDER BY images.id 
                LIMIT 1
            ) as image_url,
            users.profilepicture,  -- Fixed: changed 'user' to 'users'
            users.displayname
        FROM orders 
        INNER JOIN shoes ON orders.shoe_id = shoes.id
        INNER JOIN users ON users.id = orders.user_id
        ORDER BY orders.created_at DESC;  -- Added ordering
        `;
        return NextResponse.json(
            {
                orders: orders
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