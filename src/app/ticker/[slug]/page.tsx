"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getDCFInputs, getDCFOutput } from "./apiHelpers";
import StackedBarChart, { BarChartData } from "@/app/(components)/StackedBarChart";
import { createIncomeStatementData } from "./dataHelpers";


type DCFOutput = {
  value_per_share: number,
  df: any[]
}

export default function TickerPage({ params }: { params: { slug: string } }) {
  const ticker = params.slug.split("-")[0];
  const [dcfInputs, setdcfInputs] = useState(null);
  const [dcfOutput, setdcfOutputs] = useState<DCFOutput | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await getDCFInputs(ticker);
      setdcfInputs(res[0]);
    };
    getData();
  }, []);

  useEffect(() => {
    const compute = async () => {
      const res = await getDCFOutput(dcfInputs);
      setdcfOutputs(res);
    }
    compute();
  }, [dcfInputs]);
  if (!dcfInputs || !dcfOutput) return;

  const {value_per_share, df } = dcfOutput!;
  console.log(df);

  const incomeStatementData = createIncomeStatementData(df);
  

  return (
    <div className="bg-zinc-950 flex flex-col items-center">
        <div className="flex justify-center items-center flex-row space-x-4 py-3 ">
            <div>
                <Card>
                    <CardHeader>
                        {ticker}
                    </CardHeader>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        {dcfOutput && `${value_per_share.toFixed(2)}`}
                    </CardHeader>
                </Card>
            </div>
        </div>
        <div className="flex justify-center w-2/3">
            <StackedBarChart data={incomeStatementData} title={'test'} />
        </div>
        <div>
            HELLO
        </div>
    </div>
)

}

