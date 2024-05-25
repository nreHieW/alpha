import { Roboto_Slab } from "next/font/google";

const logoFont = Roboto_Slab({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <div className="text-xs text-justify">
        <h1 className={`text-xl ${logoFont.className} mb-2`}>what is val.</h1>
        <div>
          Val is modelled after Professor Aswath Damodaran's{" "}
          <a
            href="https://www.youtube.com/watch?v=kyKfJ_7-mdg"
            className="underline"
          >
            spreadsheet
          </a>.
          Val streamlines the process of valuing a company by acquiring
          the data required automatically, allowing you to focus on what truly matters in
          valuation - the forecasting.
        </div>
        <h1 className={`text-xl ${logoFont.className} mb-2 mt-5`}>the model</h1>

          Val uses the Discounted Cash Flow model which models the
          expected cash flows of the company discounted by some discount rate.
          <h2 className="text-sm mt-4 mb-1 underline">Cost of Capital</h2>
          <div>
            The discount rate is determined by the Cost of Capital which
            represents the return the investment is required to
            generate to justify the initial investment. It is a weighted average
            of the Cost of Equity and Cost of Debt. The Cost of Capital is
            decayed along with time as matured companies tend to approach an
            average discount rate.
          </div>
          
          <div>
            The Cost of Capital composes the
            Risk-Free Rate, Beta and the Equity Risk Premium. The Risk Free Rate
            represents the opportunity cost as opposed to the certain expected
            rate of return. Beta represents the relative volatility of the
            investment. Val uses the bottom-up approach levering the Beta from
            the Unlevered Beta. Lastly, the Equity Risk Premium is the premium
            that stocks have historically earned over riskless securities. It
            also includes a country risk premium which represents the default
            spread of countries where the company does business in.
          </div>
          
          <div>
            The Cost of Debt is the rate a company can borrow money long term
            today, reflecting both default risk and level of interest rates.
            Following Professor Damodaran's approach, Val computes synthetic
            ratings of companies using the Interest Coverage Ratio (EBIT /
            Interest Expenses).
          </div>
          <h2 className="text-sm mt-4 mb-1 underline">Growth</h2>
          <div>
            Val gathers consensus growth estimates from various sources, however
            you are still encouraged to input your personal forecasts.
          </div>
          
          <div>
            A common pitfall of these types of valuation approaches is
            unjustified growth. Val handles this by ensuring that any growth by
            a company has to be earned via reinvestment. Concretely, the Growth
            Rate is a function of both Reinvestment * Return on Invested Capital
            and the Growth Rate from improved efficiency.
          </div>
          
          <div>
            Lastly, to ensure that the growth is sensible (i.e the company does
            not grow to be larger than the economy in perpetuity), the Growth
            Rate is decayed to the Risk Free Rate.
          </div>
          
          The final value of the firm is the total present value of future cash
          flows and the terminal value adjusted by any probability of failure,
          removing debt, minority interest, employee options and adding back
          cash and any non-operating assets.
        <h1 id="inputs_description" className={`text-xl ${logoFont.className} mb-2 mt-5`}>the inputs</h1>
        <ul className="space-y-2">
          <li>
            <b>Revenues: </b> Current year operating revenues of the company.
            You should only adjust this if the company has wrongly classified
            something as operating revenue or revenues from a particular
            business segment was missed out.
          </li>
          <li>
            <b>
              Next Year Revenue Growth, Operating Margin and Compounded Annual
              Revenue Growth
            </b>
            : The main inputs that should be altered. They represent the growth
            forecast of the company.
          </li>
          <li>
            <b>Target Pre-tax Operating Margin: </b> This represents the
            expected efficiency growth of the company. It is typically set to
            the industry average.
          </li>
          <li>
            <b>Year of Convergence for Margin:</b> The time required to meet the
            target operating margin.
          </li>
          <li>
            <b>Discount Rate:</b> Input any arbitrary discount rate if computed
            with any other approach
          </li>
          <li>
            <b>Years of High Growth:</b> How many years before the company
            reaches mature status where the growth rate begins to drop.
          </li>
          <li>
            <b>Sales/Capital:</b> This represents the efficiency of growth. By
            default, it is set to industry averages.
          </li>
          <li>
            <b>Probability of Failure:</b> The probability that the company
            collapses. By default, it is calculated using the synthetic rating.
            Val assumes that only half of the book value is salvageable in the
            event of failure.
          </li>
          <li>
            <b>Value of Options:</b> Any employee options that should be
            accounted for in the final valuation.
          </li>
          <li>
            <b>Adjust R&D Expense:</b> Following Professor Damodaran, Research
            and Development expenses should be capitalized as an asset instead
            of an expense. For more information see{" "}
            <a
              href="https://www.youtube.com/watch?v=Y_UpzqNk3I4"
              className="underline"
            >
              here
            </a>
            .
          </li>
        </ul>
    </div>
  );
}
