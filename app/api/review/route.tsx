import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    try {
        const reviews = await sql`
            SELECT reviews.*, users.*, shoes.*, 
                (SELECT url 
                 FROM images 
                 WHERE images.shoe_id = shoes.id 
                 ORDER BY images.id ASC 
                 LIMIT 1) AS image_url
            FROM reviews
            INNER JOIN users ON reviews.user_id = users.id
            INNER JOIN shoes ON reviews.shoe_id = shoes.id
        `;
        return NextResponse.json(
            { reviews },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 400 }
        );
    }
}
export async function POST(request: NextRequest) {
    try {
        const { userId, productId, rating, comment } = await request.json();
        if (!userId || !productId || !rating || !comment) {
            return NextResponse.json(
                {
                    error: 'All fields are required!!',
                },
                {
                    status: 400
                }
            );
        }
        const selectedReview = await sql`
        SELECT *  FROM reviews WHERE
        reviews.user_id = ${userId} AND reviews.shoe_id = ${productId};
        `;
        if (selectedReview.length > 0) {
            await sql`
              UPDATE reviews SET comment = ${comment},rating=${rating}
              WHERE reviews.user_id = ${userId} AND reviews.shoe_id = ${productId};
            `;
            return NextResponse.json({
                message: 'Review updated successfully!!'
            }, { status: 200 });
        }
        const createdReview = await sql`
        INSERT INTO reviews (user_id,shoe_id,rating,comment)
        VALUES (${userId},${productId},${rating},${comment})
         RETURNING *
        `;
        return NextResponse.json(
            {
                message: 'Review created successfully!!',
                review: createdReview[0]
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : error,
            },
            { status: 400 }
        );
    }
}
export async function DELETE(request: NextRequest) {
    try {
        const { ids } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                {
                    error: "Need at least one id to delete review!!",
                },
                { status: 400 }
            );
        }
        await Promise.all(
            ids.map(id =>
                sql`DELETE FROM reviews WHERE id = ${id};`
            )
        );
        return NextResponse.json(
            {
                message: "All reviews deleted successfully!!",
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}