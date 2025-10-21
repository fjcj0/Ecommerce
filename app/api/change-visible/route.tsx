import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest) {
    try {
        const { productId, value } = await request.json();
        if (productId === undefined || value === undefined)
            return NextResponse.json({ error: 'Value and productId are required!!' }, { status: 400 });
        const updatedVisibleProduct = await sql`
            UPDATE shoes SET is_visible=${value}
            WHERE id=${productId}
            RETURNING *
        `;
        return NextResponse.json(
            {
                message: 'Product visibility updated successfully!',
                shoe: updatedVisibleProduct[0],
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : error },
            { status: 400 }
        );
    }
}