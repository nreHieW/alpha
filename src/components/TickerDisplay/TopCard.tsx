import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPriceHistory } from "@/lib/apiHelpers";
import LineAreaChart from "../LineAreaChart";

export default async function TopCard({
  ticker,
  value_per_share,
}: {
  ticker: string;
  value_per_share: number;
}) {
  const priceHistory = await getPriceHistory(ticker);
  // console.log(priceHistory);
  return (
    <div className="flex justify-center items-center flex-row space-x-4 py-3  ">
      <div>
        <Card>
          <CardHeader>{ticker}</CardHeader>
          <LineAreaChart priceHistory={priceHistory}/>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            {value_per_share && `${value_per_share.toFixed(2)}`}
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
