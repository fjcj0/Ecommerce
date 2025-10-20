"use client";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
interface ProductsChartProps {
    data: { month: string; total: number }[];
}
const ProductsChart: React.FC<ProductsChartProps> = ({ data }) => {
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
                            label: "Products Added",
                            data: chartValues,
                            backgroundColor: "#FF6347",
                            borderColor: "#FF6347",
                            borderWidth: 1,
                            borderRadius: { topLeft: 10, topRight: 10 },
                        },
                    ],
                };
                const chartOptions = {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 5 },
                            grid: { display: false },
                            border: { display: false },
                        },
                    },
                };
                destroyChart();
                chartInstance.current = new Chart(ctx, {
                    type: "bar",
                    data: chartData,
                    options: chartOptions,
                });
            }
        }
        return () => destroyChart();
    }, [data]);
    return <canvas ref={chartRef} />;
};
export default ProductsChart;