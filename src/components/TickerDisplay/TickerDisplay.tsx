import TopCard from "./TopCard";
import StackedBarChart from "../StackedBarChart";
import { getDCFInputs, getDCFOutput } from "../../lib/apiHelpers";
import { constructModellingData, createIncomeStatementData, decodeInputs } from "./dataHelpers";
import CardItem from "./CardItem";
import InputForm from "./InputForm";
import { DCFInputData, UserDCFInputs } from "./types";

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
    dcfInputs = {...dcfInputs, ...decoded};
  }
  let dcfOutput = await getDCFOutput(dcfInputs);
  const { value_per_share, df, cost_of_capital_components } = dcfOutput!;
  const terminalData = df[df.length - 1];

  const incomeStatementData = createIncomeStatementData(df);

  return (
    <div className="bg-zinc-950 flex flex-col items-center">
      <TopCard ticker={ticker} value_per_share={value_per_share} />
      <StackedBarChart data={incomeStatementData} />
      <div className="flex flex-row space-x-4 my-6">
        <CardItem
          title="Discount Rate"
          description="Starting Cost of Capital"
          children={
            <>
              Cost of Debt:{" "}
              {(cost_of_capital_components.cost_of_debt * 100).toFixed(2)}%
              <br />
              (Levered) Beta:{" "}
              {cost_of_capital_components.levered_beta.toFixed(2)}
              <br />
              Risk Free Rate:{" "}
              {(cost_of_capital_components.risk_free_rate * 100).toFixed(2)}%
              <br />
              Equity Risk Premium:{" "}
              {(cost_of_capital_components.equity_risk_premium * 100).toFixed(
                2
              )}
              %
              <br />
              Cost of Equity:{" "}
              {(cost_of_capital_components.cost_of_equity * 100).toFixed(2)}%
            </>
          }
          footerChildren={
            <>Cost of Capital: {(df[0].cost_of_capital * 100).toFixed(2)}%</>
          }
        />
        <CardItem
          title={"Terminal Value"}
          children={
            <>
              Terminal Revenue Growth Rate:{" "}
              {terminalData.revenue_growth_rate.toFixed(2)}%
              <br />
              Terminal Cash Flow: {terminalData.fcff}
              <br />
              Terminal Discount Rate: {terminalData.cost_of_capital.toFixed(2)}%
            </>
          }
          footerChildren={
            <>
              Terminal Value:{" "}
              {(
                terminalData.fcff /
                (terminalData.cost_of_capital -
                  terminalData.revenue_growth_rate)
              ).toFixed(2)}
            </>
          }
        />
      </div>
      <InputForm
        defaults={
          {
            revenues: dcfInputs.revenues,
            revenue_growth_rate_next_year: dcfInputs.revenue_growth_rate_next_year,
            operating_margin_next_year: dcfInputs.operating_margin_next_year,
            compounded_annual_revenue_growth_rate: dcfInputs.compounded_annual_revenue_growth_rate,
            target_pre_tax_operating_margin: dcfInputs.target_pre_tax_operating_margin,
            year_of_convergence_for_margin: dcfInputs.year_of_convergence_for_margin,
            years_of_high_growth: dcfInputs.years_of_high_growth,
            sales_to_capital_ratio_early: dcfInputs.sales_to_capital_ratio_early,
            sales_to_capital_ratio_steady: dcfInputs.sales_to_capital_ratio_steady,
            prob_of_failure: dcfInputs.prob_of_failure,
            value_of_options: dcfInputs.value_of_options,
          }
        }
      />
    </div>
  );
}
