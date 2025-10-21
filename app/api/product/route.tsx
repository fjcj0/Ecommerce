import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const {
            imagesAddedBase64,
            sizesChosen,
            quantity,
            discount,
            title,
            price,
            endsIn,
            description,
        } = data;
        const xs = sizesChosen.xs ? true : false;
        const s = sizesChosen.s ? true : false;
        const m = sizesChosen.m ? true : false;
        const l = sizesChosen.l ? true : false;
        const xl = sizesChosen.xl ? true : false;
        const result = await sql`
          INSERT INTO shoes 
            (title, price, description, available, xs, s, m, l, xl, discount, ends_in, quantity, is_visible)
          VALUES 
            (${title}, ${price}, ${description}, ${quantity}, ${xs}, ${s}, ${m}, ${l}, ${xl}, ${discount}, ${endsIn}, ${quantity}, TRUE)
          RETURNING *;
        `;
        const insertedShoe = result[0];
        for (const imageKey in imagesAddedBase64) {
            const image = imagesAddedBase64[imageKey as keyof typeof imagesAddedBase64];
            if (image) {
                await sql`
                    INSERT INTO images (shoe_id, url)
                    VALUES (${insertedShoe.id}, ${image});
                `;
            }
        }
        return NextResponse.json(
            { message: "Shoe created successfully", shoe: insertedShoe },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}
export async function GET() {
    try {
        const rows = await sql`
      SELECT s.*, i.url
      FROM shoes s
      LEFT JOIN images i ON i.shoe_id = s.id;
    `;
        const shoesMap = new Map();
        for (const row of rows) {
            if (!shoesMap.has(row.id)) {
                shoesMap.set(row.id, {
                    id: row.id,
                    title: row.title,
                    price: row.price,
                    description: row.description,
                    available: row.available,
                    xs: row.xs,
                    s: row.s,
                    m: row.m,
                    l: row.l,
                    xl: row.xl,
                    discount: row.discount,
                    ends_in: row.ends_in,
                    quantity: row.quantity,
                    is_visible: row.is_visible,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    images: [],
                });
            }
            if (row.url) shoesMap.get(row.id).images.push(row.url);
        }
        const shoes = Array.from(shoesMap.values());
        return NextResponse.json({ shoes }, { status: 200 });
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const data = await request.json();
        const shoesIds = Array.isArray(data.body?.shoes)
            ? data.body.shoes
            : Array.isArray(data.shoes)
                ? data.shoes
                : [Number(data.shoes)];

        if (!shoesIds.length) {
            return NextResponse.json({ message: "No shoe IDs provided" }, { status: 400 });
        }
        await sql`DELETE FROM images WHERE shoe_id = ANY(${shoesIds});`;
        await sql`DELETE FROM shoes WHERE id = ANY(${shoesIds});`;
        return NextResponse.json(
            { message: "Shoes and related images deleted successfully!" },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}