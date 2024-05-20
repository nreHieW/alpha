from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from modelling import dcf, calc_cost_of_capital
import pandas as pd
from pydantic import BaseModel


class CostOfCapitalRequest(BaseModel):
    interest_expense: float
    pre_tax_cost_of_debt: float
    average_maturity: int
    bv_debt: float
    num_shares_outstanding: int
    curr_price: float
    unlevered_beta: float
    tax_rate: float
    risk_free_rate: float
    equity_risk_premium: float


class DCFRequest(BaseModel):
    revenues: float
    interest_expense: float
    book_value_of_equity: float
    book_value_of_debt: float
    cash_and_marketable_securities: float
    cross_holdings_and_other_non_operating_assets: float
    number_of_shares_outstanding: int
    curr_price: float
    effective_tax_rate: float
    marginal_tax_rate: float
    unlevered_beta: float
    risk_free_rate: float
    equity_risk_premium: float
    mature_erp: float
    pre_tax_cost_of_debt: float
    average_maturity: int
    prob_of_failure: float
    value_of_options: float
    revenue_growth_rate_next_year: float
    operating_margin_next_year: float
    compounded_annual_revenue_growth_rate: float
    target_pre_tax_operating_margin: float
    year_of_convergence_for_margin: int
    years_of_high_growth: int
    sales_to_capital_ratio_early: float
    sales_to_capital_ratio_steady: float


load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Status": "OK"}


@app.post("/costOfCapital")
def cost_of_capital(request: CostOfCapitalRequest):
    return calc_cost_of_capital(
        request.interest_expense,
        request.pre_tax_cost_of_debt,
        request.average_maturity,
        request.bv_debt,
        request.num_shares_outstanding,
        request.curr_price,
        request.unlevered_beta,
        request.tax_rate,
        request.risk_free_rate,
        request.equity_risk_premium,
    )


@app.post("/dcf")
def discounted_cash_flow(request: DCFRequest):
    value_per_share, df, cost_of_capital_components = dcf(
        request.revenues,
        request.interest_expense,
        request.book_value_of_equity,
        request.book_value_of_debt,
        request.cash_and_marketable_securities,
        request.cross_holdings_and_other_non_operating_assets,
        request.number_of_shares_outstanding,
        request.curr_price,
        request.effective_tax_rate,
        request.marginal_tax_rate,
        request.unlevered_beta,
        request.risk_free_rate,
        request.equity_risk_premium,
        request.mature_erp,
        request.pre_tax_cost_of_debt,
        request.average_maturity,
        request.prob_of_failure,
        request.value_of_options,
        request.revenue_growth_rate_next_year,
        request.operating_margin_next_year,
        request.compounded_annual_revenue_growth_rate,
        request.target_pre_tax_operating_margin,
        request.year_of_convergence_for_margin,
        request.years_of_high_growth,
        request.sales_to_capital_ratio_early,
        request.sales_to_capital_ratio_steady,
    )
    df = df.fillna("")
    return {"value_per_share": value_per_share, "df": df.to_dict(orient="records"), "cost_of_capital_components": cost_of_capital_components}
