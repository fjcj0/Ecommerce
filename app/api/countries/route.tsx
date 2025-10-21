import { NextResponse } from 'next/server';
import axios from 'axios';
export async function GET() {
    try {
        const res = await axios.get('https://www.apicountries.com/countries');
        return NextResponse.json(res.data);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
    }
}