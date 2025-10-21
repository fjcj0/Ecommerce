import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: 'Id is required!!' },
                { status: 400 }
            );
        }
        const address = await sql`
        SELECT street,city,state,zip,country FROM addresses
        WHERE user_id = ${id};
        `
        return NextResponse.json(
            {
                address: address[0],
            }, { status: 200 }
        )
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}