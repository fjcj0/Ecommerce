import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const sql = neon(process.env.NEXT_PUBLIC_POSTGRESS_API!);
        const result = await sql`SELECT NOW();`;
        console.log('Connected successfully!!');
        return NextResponse.json({
            success: true,
            connected: true,
            serverTime: result[0].now,
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return NextResponse.json({
            success: false,
            connected: false,
            error: error instanceof Error ? error.message : error,
        });
    }
}