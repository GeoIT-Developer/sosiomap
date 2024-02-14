import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id') as string;
        const timestamp = req.nextUrl.searchParams.get('timestamp') as string;
        const type = req.nextUrl.searchParams.get('type') as string;
        let kpuURL = '';
        if (type === 'DPD') {
            kpuURL = `https://infopemilu.kpu.go.id/Pemilu/Dct_dpd/dct_dpd?kode_pro=${id}&_=${timestamp}`;
        } else if (type === 'DPR') {
            kpuURL = `https://infopemilu.kpu.go.id/Pemilu/Dct_dpr/Dct_dpr?kode_dapil=${id}&_=${timestamp}`;
        } else if (type === 'DPRD_PROV') {
            kpuURL = `https://infopemilu.kpu.go.id/Pemilu/Dct_dprprov/Dct_dprprov?kode_dapil=${id}&_=${timestamp}`;
        } else if (type === 'DPRD_KAB_KOTA') {
            kpuURL = `https://infopemilu.kpu.go.id/Pemilu/Dct_dprd/Dct_dprdkabko?kode_dapil=${id}&_=${timestamp}`;
        }
        const response = await fetch(kpuURL);

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
