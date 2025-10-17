"use client";
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const ProductsChart: React.FC = () => {
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
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const chartData = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    datasets: [
                        {
                            label: 'Products Added',
                            data: [2, 5, 7, 10, 12, 15, 18, 22, 30],
                            backgroundColor: '#FF6347',
                            borderColor: '#FF6347',
                            borderWidth: 1,
                            borderRadius: { topLeft: 10, topRight: 10 },
                        },
                    ],
                };
                const chartOptions = {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 5,
                            },
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            },
                        },
                    },
                };
                destroyChart();
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions,
                });
            }
        }
        return () => destroyChart();
    }, []);
    return <canvas ref={chartRef} />;
};
export default ProductsChart;