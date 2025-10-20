import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const shoeId = Number(id);
        const rows = await sql`
      SELECT s.*, i.url
      FROM shoes s
      LEFT JOIN images i ON i.shoe_id = s.id
      WHERE s.id = ${shoeId};
    `;
        if (!rows.length) {
            return NextResponse.json({ message: "Shoe not found!" }, { status: 200 });
        }
        const images = rows.map((row: any) => row.url).filter(Boolean);
        const { url, ...shoeData } = rows[0];
        const shoe = {
            ...shoeData,
            images,
        };
        return NextResponse.json({ shoe }, { status: 200 });
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}