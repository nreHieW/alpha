import TopCard from "./top-card";
import StackedBarChart from "../stacked-bar-chart";
import { getDCFInputs, getDCFOutput } from "../../lib/apiHelpers";
import {
  constructModellingData,
  createIncomeStatementData,
  decodeInputs,
  formatAmount,
} from "./dataHelpers";
import CardItem from "./card-item";
import InputForm from "./input-form";
import { DCFInputData, UserDCFInputs } from "./types";
import InfoHover from "../info-hover";

export default async function TickerDisplay({
  ticker,
  userInputs,
}: {
  ticker: string;
  userInputs: string;
}) {
  const dcfData = await getDCFInputs(ticker);

  let dcfInputs: DCFInputData = constructModellingData(dcfData);
  if (userInputs.length != 0) {
    let decoded: UserDCFInputs = decodeInputs(userInputs);
    dcfInputs = { ...dcfInputs, ...decoded };
  }
  let dcfOutput = await getDCFOutput(dcfInputs);
  const { value_per_share, df, cost_of_capital_components } = dcfOutput!;
  const terminalData = df[df.length - 1];

  const incomeStatementData = createIncomeStatementData(df);
  const revenues = df.map((item: any) => formatAmount(item.revenues));
  return (
    <div>
      <TopCard
        ticker={ticker}
        value_per_share={value_per_share}
        name={dcfData.name}
        book_value_of_debt={dcfInputs.book_value_of_debt}
        cash_and_marketable_securities={
          dcfInputs.cash_and_marketable_securities
        }
        cross_holdings_and_other_non_operating_assets={
          dcfInputs.cross_holdings_and_other_non_operating_assets
        }
        value_of_options={dcfInputs.value_of_options}
      />
      <div>
        <div className="pt-7 flex items-center">
          <div className="flex-row flex">
            <p className="text-lg">10 Year Revenue Projections</p>
            <div className="justify-center items-center ml-3 mt-2">
              <InfoHover text={"Revenues are broken down into operating expense, reinvestment to drive future growth and taxes, to get Free Cash Flow to Firm"}></InfoHover>
            </div>
          </div>
        </div>
        <div>
          <StackedBarChart data={incomeStatementData} labels={revenues} />
        </div>
      </div>
      <div className="grid sm:space-x-4 space-y-4 sm:space-y-0 my-6 sm:grid-cols-2">
        <CardItem
          title="Discount Rate"
          tooltip="Cash flows are discounted at the cost of capital which is calculated using the CAPM model."
          children={
            <>
              Cost of Debt:{" "}
              {(cost_of_capital_components.cost_of_debt * 100).toFixed(2)}%
              <br />
              (Levered) Beta:{" "}
              {(cost_of_capital_components.levered_beta ).toFixed(2)}
              <br />
              Risk Free Rate:{" "}
              {(cost_of_capital_components.risk_free_rate * 100).toFixed(2)}%
              <br />
              Equity Risk Premium:{" "}
              {(cost_of_capital_components.equity_risk_premium * 100).toFixed(2)}
              <br />
              Cost of Equity:{" "}
              {(cost_of_capital_components.cost_of_equity * 100).toFixed(2)}%
            </>
          }
          footerChildren={
            <>Cost of Capital: {formatAmount(df[0].cost_of_capital * 100)}</>
          }
        />
        <CardItem
          title={"Terminal Value"}
          tooltip="The value of the company at the end of the forecast period in stable growth."
          children={
            <>
              Terminal Growth Rate:{" "}
              {(terminalData.revenue_growth_rate * 100).toFixed(2)}%
              <br />
              Terminal Cash Flow: {formatAmount(terminalData.fcff)}
              <br />
              Terminal Discount Rate:{" "}
              {(terminalData.cost_of_capital * 100).toFixed(2)}%
            </>
          }
          footerChildren={
            <div className="">
              Terminal Value:{" "}
              {formatAmount(
                terminalData.fcff /
                  (terminalData.cost_of_capital -
                    terminalData.revenue_growth_rate)
              )}
            </div>
          }
        />
      </div>
      <InputForm
        defaults={{
          revenues: dcfInputs.revenues,
          revenue_growth_rate_next_year:
            dcfInputs.revenue_growth_rate_next_year,
          operating_income:
            dcfInputs.revenues * dcfInputs.operating_margin_next_year,
          operating_margin_next_year: dcfInputs.operating_margin_next_year,
          compounded_annual_revenue_growth_rate:
            dcfInputs.compounded_annual_revenue_growth_rate,
          target_pre_tax_operating_margin:
            dcfInputs.target_pre_tax_operating_margin,
          year_of_convergence_for_margin:
            dcfInputs.year_of_convergence_for_margin,
          years_of_high_growth: dcfInputs.years_of_high_growth,
          sales_to_capital_ratio_early: dcfInputs.sales_to_capital_ratio_early,
          sales_to_capital_ratio_steady:
            dcfInputs.sales_to_capital_ratio_steady,
          prob_of_failure: dcfInputs.prob_of_failure,
          value_of_options: dcfInputs.value_of_options,
        }}
      />
    </div>
  );
}
