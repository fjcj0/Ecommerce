import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ checkoutId: string }> }
) {
    try {
        const { checkoutId } = await params;

        if (!checkoutId) {
            return NextResponse.json(
                { error: 'CheckoutId is required!!' },
                { status: 400 }
            );
        }

        await sql`
      DELETE FROM checkouts
      WHERE checkouts.id = ${checkoutId};
    `;

        return NextResponse.json(
            { message: 'CheckOut Deleted Successfully!!' },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}