import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
//   Title,
  Tooltip,
  Legend
);

export type BarChartData = {
  labels: string[]; // X axis
  datasets: { label: string; data: number[] }[]; // length of data should match length of labels string[]
};

type BarChartProps = {
  data: BarChartData;
  title: string;
};

function StackedBarChart({ data, title }: BarChartProps) {
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false, 
          color: 'transparent',
          drawTicks: false,
        },
        ticks: {
            font: {
                size: 7
            }
        }
      },
      y: {
        stacked: true,
        display: false,
        grid: {
          display: false, 
          drawBorder: false,
          color: 'transparent',
          drawTicks: false,
        },
      },
      
    },
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}

export default StackedBarChart;
