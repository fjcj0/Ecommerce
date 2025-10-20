import cloudinary from "@/config/cloudainry";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { imageBase64 } = body;
        if (!imageBase64) {
            return NextResponse.json({ message: "No image provided" }, { status: 400 });
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
        return NextResponse.json({
            message: "Image Uploaded Successfully!!",
            imageUrl: uploadResult.secure_url
        }, { status: 201 });

    } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}