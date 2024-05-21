import { BarChartData } from "@/components/StackedBarChart";
import {
  encode as msgPackEncode,
  decode as msgPackDecode,
} from "@msgpack/msgpack";
import { DCFInputData, UserDCFInputs } from "./types";
const metrics = [
  "Operating Expenses",
  "Taxes",
  "Reinvestment",
  "Free Cash Flow",
];
const colors = [
  "rgba(75, 192, 192, 0.5)",
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(153, 102, 255, 0.5)",
];

export function createIncomeStatementData(data: any[]): BarChartData {
  let dataSlice = data.slice(0, -1);
  let datasets = dataSlice.reduce((acc, item, index) => {
    const { revenues, operating_margin, taxes, reinvestment, fcff } = item;
    const operating_expenses = revenues * (1 - operating_margin);
    if (index === 0) {
      metrics.forEach((metric, idx) => {
        acc.push({
          label: metric,
          data: [],
          backgroundColor: colors[idx],
          borderColor: "black",
          borderWidth: 1,
          borderSkipped: false,
        });
      });
    }

    // acc[0].data.push(revenues);
    acc[0].data.push(operating_expenses);
    acc[1].data.push(taxes);
    acc[2].data.push(reinvestment);
    acc[3].data.push(fcff);

    return acc;
  }, []);

  let yearLabels = dataSlice.map((_, index) => `Year ${index}`);
  yearLabels[0] = "Base Year";

  return {
    labels: yearLabels,
    datasets: datasets,
  };
}


const DCFInputKeys = [
  'revenues',
  'interest_expense',
  'book_value_of_equity',
  'book_value_of_debt',
  'cash_and_marketable_securities',
  'cross_holdings_and_other_non_operating_assets',
  'number_of_shares_outstanding',
  'curr_price',
  'effective_tax_rate',
  'marginal_tax_rate',
  'unlevered_beta',
  'risk_free_rate',
  'equity_risk_premium',
  'mature_erp',
  'pre_tax_cost_of_debt',
  'average_maturity',
  'prob_of_failure',
  'value_of_options',
  'revenue_growth_rate_next_year',
  'operating_margin_next_year',
  'compounded_annual_revenue_growth_rate',
  'target_pre_tax_operating_margin',
  'year_of_convergence_for_margin',
  'years_of_high_growth',
  'sales_to_capital_ratio_early',
  'sales_to_capital_ratio_steady'
];

export function constructModellingData(data: any) : DCFInputData {
  const result: Partial<DCFInputData> = {};
  DCFInputKeys.forEach((key) => {
    if (key in data) {
      result[key as keyof DCFInputData] = data[key];
    }
  });
  return result as DCFInputData;
}

export function encodeInputs(inputs: UserDCFInputs): string {
  const buffer = msgPackEncode(inputs);
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
export function decodeInputs(encoding: string): UserDCFInputs {
  const base64 = encoding.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");
  const data = msgPackDecode(buffer);
  return data as UserDCFInputs;
}
