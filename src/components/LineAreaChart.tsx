"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
//   Tooltip,
  Filler,
);

export default function LineAreaChart({
  priceHistory,
}: {
  priceHistory: number[];
}) {
    
  return <Line data={{
    labels: Array.from({length: priceHistory.length}, (_, i) => i),
    datasets: [
        {
            data: priceHistory,
            fill:true,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            pointRadius: 0,
            borderWidth: 0.4
        }
    ]
  }} options={{
    responsive:true,
    scales: {
        x: {
          stacked: true,
          display: false,
          grid: {
            display: false,
            color: 'transparent',
            drawTicks: false,
          },
        },
        y: {
          stacked: true,
          display: false,
          grid: {
            display: false, 
            color: 'transparent',
            drawTicks: false,
          },
        },
    },
    plugins: {
        legend: {
            display: false
        },
    }
  }}> </Line>
}
