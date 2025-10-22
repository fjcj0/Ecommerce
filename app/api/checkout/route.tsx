import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { userId, productId, xs, s, m, l, xl, quantity } = await request.json();
        if (!userId || !productId || !quantity) {
            return NextResponse.json(
                {
                    error: 'You need at least choose one size and create quantity'
                },
                {
                    status: 400
                }
            );
        }
        const createdCheckOut = await sql`
            INSERT INTO checkouts (user_id,shoe_id,xs,s,m,l,xl,quantity)
            VALUES (${userId},${productId},${xs},${s},${m},${l},${xl},${quantity})
            RETURNING *
        `;
        return NextResponse.json(
            { message: 'Checkout crated successfully!!', createdCheckOut: createdCheckOut[0] },
            { status: 201 }
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
export async function PUT(request: NextRequest) {
    try {
        const { userId, productId, xs, s, m, l, xl, quantity } = await request.json();
        if (!userId || !productId || !quantity) {
            return NextResponse.json(
                {
                    error: 'You need at least choose one size and create quantity'
                },
                { status: 400 }
            );
        }
        const createdCheckOut = await sql`
             UPDATE checkouts SET
             xs=${xs},
             s=${s},
             m=${m},
             l=${l},
             xl=${xl},
             quantity=${quantity}
             WHERE checkouts.user_id = ${userId} AND checkouts.shoe_id = ${productId};
        `;
        return NextResponse.json(
            { message: 'Checkout updated successfully!!', createdCheckOut: createdCheckOut[0] },
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