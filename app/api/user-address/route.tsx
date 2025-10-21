import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest) {
    try {
        const { data } = await request.json();
        const { zip, state, country, city, street, userId } = data;
        if (!zip || !state || !country || !city || !street || !userId) {
            return NextResponse.json(
                { error: 'All fields are required and do not forget to pass userId' },
                { status: 400 }
            );
        }
        const isExist = await sql`SELECT * FROM addresses WHERE user_id = ${userId}`;
        if (isExist.length === 0) {
            await sql`
                INSERT INTO addresses (user_id, street, city, state, zip, country)
                VALUES (${userId}, ${street}, ${city}, ${state}, ${zip}, ${country})
            `;
            return NextResponse.json(
                { message: 'Address created successfully!!' },
                { status: 201 }
            );
        } else {
            await sql`
                UPDATE addresses
                SET street = ${street},
                    city = ${city},
                    state = ${state},
                    zip = ${zip},
                    country = ${country}
                WHERE user_id = ${userId}
            `;
            return NextResponse.json(
                { message: 'Address updated successfully!!' },
                { status: 200 }
            );
        }
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}