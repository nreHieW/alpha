import { getPriceHistory } from "@/lib/apiHelpers";
import LineAreaChart from "../line-area-chart";

function calculateValue(value: number, currPrice: number): number {
  return (currPrice / value) * 100;
}

export default async function TopCard({
  ticker,
  name,
  value_per_share,
}: {
  ticker: string;
  name: string;
  value_per_share: number;
}) {
  const priceHistory = await getPriceHistory(ticker);
  const currentPrice = priceHistory[priceHistory.length - 1];
  const startPrice = priceHistory[0];
  let value = 0;
  if (value_per_share) {
    value = calculateValue(value_per_share, currentPrice);
  }
  return (
    <div className="flex sm:flex-row w-full justify-between flex-col">
      <div className="w-1/2 h-full flex-1">
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
      <div className="w-1/2 pl-3 h-full flex-1">
        <div className="pt-6 flex flex-col ">
          <div className="text-sm">Value Per Share:</div>
          <div className="self-end mr-3 text-base sm:text-2xl p-5">
            ${value_per_share.toFixed(2)}
          </div>
        </div>
        <div className="text-sm">
          <p>
            This represents a{" "}
            {value > 100 ? (
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
        </div>
      </div>
    </div>
  );
}
