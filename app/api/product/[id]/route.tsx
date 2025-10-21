import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const data = await request.json();
        const { id } = await context.params;
        const productId = Number(id);
        const {
            sizesChosen,
            quantity,
            discount,
            title,
            price,
            endsIn, // from frontend
            description,
        } = data;

        const updatedShoe = await sql`
  UPDATE shoes 
  SET quantity = ${quantity},
      discount = ${discount},
      xs = ${sizesChosen[0]},
      s = ${sizesChosen[1]},
      m = ${sizesChosen[2]},
      l = ${sizesChosen[3]},
      xl = ${sizesChosen[4]},
      title = ${title},
      price = ${price},
      ends_in = ${endsIn}, -- ✅ ends_in matches database column
      description = ${description}
  WHERE id = ${productId}
  RETURNING *;
`;
        return NextResponse.json({
            message: "Updated Successfully!!",
            shoe: updatedShoe[0],
        }, { status: 200 });
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}