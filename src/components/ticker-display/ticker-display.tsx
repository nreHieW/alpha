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
      />
      <div>
        <div className="pt-7 flex items-center">
          <div className="flex-row flex">
            <p className="text-lg">10 Year Cash Flow Projections</p>
            <div className="justify-center items-center ml-3 mt-2"><InfoHover text={'test'}></InfoHover></div>
          </div>
        </div>

        <StackedBarChart data={incomeStatementData} labels={revenues} />
      </div>
      <div className="flex flex-row space-x-4 my-6">
        <CardItem
          title="Discount Rate"
          children={
            <>
              Cost of Debt:{" "}
              {formatAmount(cost_of_capital_components.cost_of_debt)}
              <br />
              (Levered) Beta:{" "}
              {formatAmount(cost_of_capital_components.levered_beta)}
              <br />
              Risk Free Rate:{" "}
              {formatAmount(cost_of_capital_components.risk_free_rate)}
              <br />
              Equity Risk Premium:{" "}
              {formatAmount(cost_of_capital_components.equity_risk_premium)}
              <br />
              Cost of Equity:{" "}
              {formatAmount(cost_of_capital_components.cost_of_equity)}
            </>
          }
          footerChildren={
            <>Cost of Capital: {formatAmount((df[0].cost_of_capital * 100))}</>
          }
        />
        <CardItem
          title={"Terminal Value"}
          children={
            <>
              Terminal Growth Rate:{" "}
              {formatAmount(terminalData.revenue_growth_rate)}
              <br />
              Terminal Cash Flow: {formatAmount(terminalData.fcff)}
              <br />
              Terminal Discount Rate: {formatAmount(terminalData.cost_of_capital)}
            </>
          }
          footerChildren={
            <div className="self-end">
              Terminal Value:{" "}
              {formatAmount(terminalData.fcff /
                (terminalData.cost_of_capital -
                  terminalData.revenue_growth_rate))}
            </div>
          }
        />
      </div>
      <InputForm
        defaults={{
          revenues: dcfInputs.revenues,
          revenue_growth_rate_next_year:
            dcfInputs.revenue_growth_rate_next_year,
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
