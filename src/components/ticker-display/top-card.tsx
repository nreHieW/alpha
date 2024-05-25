import { getPriceHistory } from "@/lib/apiHelpers";
import LineAreaChart from "../line-area-chart";
import { formatAmount } from "./dataHelpers";
import { Card, CardContent } from "../ui/card";

function calculateValue(value: number, currPrice: number): number {
  return (currPrice / value) * 100;
}

export default async function TopCard({
  ticker,
  name,
  value_per_share,
  final_components,
}: {
  ticker: string;
  name: string;
  value_per_share: number;
  final_components: {
    present_value_of_cash_flows: number;
    operating_value: number;
    book_value_of_debt: number;
    cash_and_marketable_securities: number;
    cross_holdings_and_other_non_operating_assets: number;
  };
}) {
  const priceHistory = await getPriceHistory(ticker);
  const currentPrice = priceHistory[priceHistory.length - 1];
  const startPrice = priceHistory[0];
  let value = 0;
  if (value_per_share) {
    value = calculateValue(value_per_share, currentPrice);
  }
  return (
    <div className="grid sm:grid-cols-2 w-full">
      <div className="w-full h-full flex-1">
        <p className="text-base underline-offset-4 underline sm:text-xl">
          {name}
        </p>
        <p className="text-xs pt-1">Ticker: {ticker}</p>
        <LineAreaChart
          priceHistory={priceHistory}
          good={currentPrice > startPrice}
          title={"6M Performance"}
        />
      </div>
      <div className="w-full pl-5 h-full flex flex-col">
        <div className="flex flex-col h-full mt-6">
          <div className="text-sm">Value Per Share:</div>
          <div className="self-end mr-2 text-base sm:text-2xl">
            ${value_per_share.toFixed(2)}
          </div>
        </div>
        <div className="h-full">
          <p className="text-sm">
            This represents a{" "}
            {value < 0 ? (
              <span style={{ color: "rgb(218, 65, 103)" }}>
                {Math.abs(value).toFixed(2)}% overvaluation
              </span>
            ) : value > 100 ? (
              <span style={{ color: "rgb(218, 65, 103)" }}>
                {value.toFixed(2)}% overvaluation
              </span>
            ) : (
              <span style={{ color: "rgb(0, 196, 154)" }}>
                {value.toFixed(2)}% undervaluation
              </span>
            )}{" "}
            of the current price (${currentPrice.toFixed(2)}).
          </p>
          <br />

          <Card className= "bg-slate-50 dark:bg-zinc-950 pt-4 text-muted-foreground text-xs">
            <CardContent>
              <p className="">Components:</p>
              <ul className="ml-4">
                <li>
                  Present Value of Cash Flows:{" "}
                  {formatAmount(final_components.present_value_of_cash_flows)}
                </li>
                <li>
                  Book Value of Debt:{" "}
                  {formatAmount(final_components.book_value_of_debt)}
                </li>
                <li>
                  Cash Equivalents :{" "}
                  {formatAmount(
                    final_components.cash_and_marketable_securities
                  )}
                </li>
                <li>
                  Non-Operating Assets:{" "}
                  {
                    formatAmount(final_components.cross_holdings_and_other_non_operating_assets)
                  }
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
