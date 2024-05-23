import dbConnect from "../../../lib/dbconnect";
import DCFInput from "@/app/(models)/DcfInputs";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker');
  const res = await DCFInput.find({Ticker: ticker?.toUpperCase()});
  return new Response(JSON.stringify(res));
}