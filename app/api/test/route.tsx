import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
export async function GET() {
  try {
    const sql = neon(process.env.NEXT_PUBLIC_POSTGRESS_API!);
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        displayname TEXT,
        profilepicture TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await sql`
  CREATE TABLE IF NOT EXISTS shoes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    price DECIMAL,
    description TEXT,
    available INTEGER DEFAULT 0,
    xs BOOLEAN DEFAULT FALSE,
    s BOOLEAN DEFAULT FALSE,
    m BOOLEAN DEFAULT FALSE,
    l BOOLEAN DEFAULT FALSE,
    xl BOOLEAN DEFAULT FALSE,
    discount DECIMAL(5,2),
    ends_in TIMESTAMP,   
    quantity INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;
    await sql`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        shoe_id INTEGER REFERENCES shoes(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        shoe_id INTEGER REFERENCES shoes(id) ON DELETE CASCADE,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await sql`
  CREATE TABLE IF NOT EXISTS checkouts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shoe_id INTEGER REFERENCES shoes(id) ON DELETE CASCADE,
    xs BOOLEAN NULL,
    s BOOLEAN NULL,
    m BOOLEAN NULL,
    l BOOLEAN NULL,
    xl BOOLEAN NULL,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        shoe_id INTEGER REFERENCES shoes(id) ON DELETE SET NULL,
        xs BOOLEAN NULL,
        s BOOLEAN NULL,
        m BOOLEAN NULL,
        l BOOLEAN NULL,
        xl BOOLEAN NULL,
        quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
        final_price DECIMAL(10,2),
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS sales (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        shoe_id INTEGER REFERENCES shoes(id),
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1,
        price DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        street TEXT,
        city TEXT,
        state TEXT,
        zip TEXT,
        country TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('All tables created or already exist!!');
    return NextResponse.json({
      success: true,
      message: 'All tables created successfully (or already exist)!!',
    });
  } catch (error) {
    console.error('❌ Database setup error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}