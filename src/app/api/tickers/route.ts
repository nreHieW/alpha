import dbConnect from "../../lib/dbconnect";
import DCFInput from "@/app/(models)/DcfInputs";

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  let mongooseQuery;
  if (query === '') {
    mongooseQuery = {};
  } else {
    mongooseQuery = {
      $or: [
        { Ticker: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ]
    };
  }

  const tickers = await DCFInput.find(mongooseQuery, { _id: 0, Ticker: 1, name: 1 });
  return new Response(JSON.stringify(tickers));
}
