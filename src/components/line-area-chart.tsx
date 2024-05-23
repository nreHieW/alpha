"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
);
ChartJS.defaults.font.family = 'JetBrains Mono'

export default function LineAreaChart({
  priceHistory,
  good,
  title,
}: {
  priceHistory: number[];
  good: boolean,
  title: string
}) {
    
  return (
  <>
  <p className="text-center text-xs pt-4">{title}</p>
  <Line data={{
    labels: Array.from({length: priceHistory.length}, (_, i) => i),
    datasets: [
        {
            data: priceHistory,
            fill:false,
            borderColor: good ? 'rgb(0, 196, 154)' : 'rgb(218, 65, 103)',
            pointRadius: 0,
            borderWidth: 1
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
          display: true,
          grid: {
            display: false, 
            color: 'transparent',
            drawTicks: false,
          },
          ticks: {
            font: {
                family: "JetBrains Mono",
                weight: 'normal',
                size: 8.5
            }
        }
        },
    },
    plugins: {
        legend: {
            display: false
        },
    }
  }}> </Line>
  </>)
}
