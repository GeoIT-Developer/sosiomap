import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const txt = req.nextUrl.searchParams.get('txt') as string;
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=geojson&q=${txt}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const theJson = await response.json();

        return NextResponse.json({ data: theJson }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: JSON.stringify(err) },
            { status: 422 },
        );
    }
}
