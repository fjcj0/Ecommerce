"use client";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
interface SalesChartProps {
    data: { month: string; total: number }[];
}
const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);
    useEffect(() => {
        const destroyChart = () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                const defaultLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
                const chartLabels = data && data.length > 0 ? data.map(d => d.month) : defaultLabels;
                const chartValues = data && data.length > 0 ? data.map(d => d.total) : Array(defaultLabels.length).fill(0);
                const chartData = {
                    labels: chartLabels,
                    datasets: [
                        {
                            label: "Sold",
                            data: chartValues,
                            borderColor: "#6a5acd",
                            backgroundColor: "rgba(106, 92, 205, 0.2)",
                            fill: true,
                            tension: 0.4,
                            pointRadius: 5,
                            pointBackgroundColor: "#6a5acd",
                        },
                    ],
                };
                const chartOptions = {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 10 },
                            grid: { display: false },
                            border: { display: false },
                        },
                    },
                };
                destroyChart();
                chartInstance.current = new Chart(ctx, {
                    type: "line",
                    data: chartData,
                    options: chartOptions,
                });
            }
        }
        return () => destroyChart();
    }, [data]);
    return <canvas ref={chartRef} />;
};
export default SalesChart;