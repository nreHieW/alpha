import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbconnect'
import DCFInput from '@/app/(models)/DcfInputs';
import { NextResponse } from 'next/server';
 
export async function GET(
) {
    await dbConnect();
    const tickers = await DCFInput.find({}, {"_id": 0, "Ticker": 1, "name": 1});
    // console.log(tickers);
    return Response.json(tickers)
}