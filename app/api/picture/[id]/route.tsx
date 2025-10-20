import cloudinary from "@/config/cloudainry";
import { sql } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { imageBase64 } = body;
        if (!id) {
            return NextResponse.json(
                { error: "Product id is required!" },
                { status: 400 }
            );
        }
        if (!imageBase64) {
            return NextResponse.json(
                { error: "Image data is required!" },
                { status: 400 }
            );
        }
        const uploadResult: any = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "images-shoes" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");
            stream.end(buffer);
        });
        const uploadedPicture = await sql`
      INSERT INTO images (shoe_id, url)
      VALUES (${parseInt(id)}, ${uploadResult.secure_url})
      RETURNING *;
    `;
        return NextResponse.json({
            message: "Image uploaded successfully!",
            image: uploadedPicture[0].url,
        });
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { url } = body;
        if (!id || !url) {
            return NextResponse.json(
                { error: "Product id and image URL are required!" },
                { status: 400 }
            );
        }
        const publicId = url
            .split("/")
            .pop()
            ?.split(".")[0];
        if (publicId) {
            await cloudinary.uploader.destroy(`images-shoes/${publicId}`);
        }
        await sql`
      DELETE FROM images
      WHERE shoe_id = ${parseInt(id)} AND url = ${url};
    `;
        return NextResponse.json({ message: "Image deleted successfully!" });
    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : error },
            { status: 500 }
        );
    }
}