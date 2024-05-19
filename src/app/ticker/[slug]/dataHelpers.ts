import { BarChartData } from "@/app/(components)/StackedBarChart";

const metrics = ['Operating Expenses', 'Taxes', 'Reinvestment', 'Free Cash Flow'];
const colors = ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(153, 102, 255, 0.5)'];

export function createIncomeStatementData(data: any[]): BarChartData {
  let dataSlice = data.slice(0, -1);
  let datasets = dataSlice.reduce((acc, item, index) => {
    const { revenues, operating_margin, taxes, reinvestment, fcff } = item;
    const operating_expenses = revenues * (1 - operating_margin);
    if (index === 0) {
      metrics.forEach((metric, idx) => {
        acc.push({ label: metric, data: [], backgroundColor: colors[idx], borderColor: 'black', borderWidth: 1, borderSkipped: false,});
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
    datasets: datasets
  };
}
