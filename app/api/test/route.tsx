import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const sql = neon(process.env.NEXT_PUBLIC_POSTGRESS_API!);
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        displayName TEXT,
        profilePicture TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
        console.log('Connected successfully!');
        return NextResponse.json({
            success: true,
            connected: true,
            message: 'Users table created or already exists (with updated_at trigger).',
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
            success: false,
            connected: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }
}