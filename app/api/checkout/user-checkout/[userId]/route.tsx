import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/config/db';
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;
        console.log('Fetching checkouts for user:', userId);
        if (!userId) {
            return NextResponse.json(
                { error: 'UserId is required' },
                { status: 400 }
            );
        }
        const checkouts = await sql`
            WITH ranked_images AS (
                SELECT 
                    *,
                    ROW_NUMBER() OVER (PARTITION BY shoe_id ORDER BY id) as rn
                FROM images
            )
            SELECT 
                checkouts.id as checkout_id,
                checkouts.user_id,
                checkouts.shoe_id,
                checkouts.xs as checkout_xs,
                checkouts.s as checkout_s,
                checkouts.m as checkout_m,
                checkouts.l as checkout_l,
                checkouts.xl as checkout_xl,
                checkouts.quantity as checkout_quantity,
                checkouts.created_at as checkout_created_at,
                checkouts.updated_at as checkout_updated_at,
                shoes.title,
                shoes.price,
                shoes.description,
                shoes.available,
                shoes.xs as shoe_xs,
                shoes.s as shoe_s,
                shoes.m as shoe_m,
                shoes.l as shoe_l,
                shoes.xl as shoe_xl,
                shoes.discount,
                shoes.ends_in,
                shoes.quantity as shoe_quantity,
                shoes.is_visible,
                shoes.created_at as shoe_created_at,
                shoes.updated_at as shoe_updated_at,
                ri.url as image_url
            FROM checkouts 
            INNER JOIN shoes ON shoes.id = checkouts.shoe_id
            INNER JOIN ranked_images ri ON shoes.id = ri.shoe_id AND ri.rn = 1
            WHERE checkouts.user_id = ${userId};
        `;
        const formattedCheckouts = checkouts.map(checkout => ({
            id: checkout.checkout_id,
            user_id: checkout.user_id,
            shoe_id: checkout.shoe_id,
            quantity: checkout.checkout_quantity,
            sizes: {
                xs: checkout.checkout_xs,
                s: checkout.checkout_s,
                m: checkout.checkout_m,
                l: checkout.checkout_l,
                xl: checkout.checkout_xl
            },
            created_at: checkout.checkout_created_at,
            updated_at: checkout.checkout_updated_at,
            shoes: {
                id: checkout.shoe_id,
                title: checkout.title,
                price: checkout.price,
                description: checkout.description,
                available: checkout.available,
                sizes: {
                    xs: checkout.shoe_xs,
                    s: checkout.shoe_s,
                    m: checkout.shoe_m,
                    l: checkout.shoe_l,
                    xl: checkout.shoe_xl
                },
                discount: checkout.discount,
                ends_in: checkout.ends_in,
                quantity: checkout.shoe_quantity,
                is_visible: checkout.is_visible,
                created_at: checkout.shoe_created_at,
                updated_at: checkout.shoe_updated_at,
                image_url: checkout.image_url
            }
        }));
        return NextResponse.json({
            success: true,
            checkouts: formattedCheckouts,
        });
    } catch (error: unknown) {
        console.error('Checkout fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch checkout items. Please try again later.'
            },
            { status: 500 }
        );
    }
}