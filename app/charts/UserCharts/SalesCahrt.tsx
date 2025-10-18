"use client";
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SalesChart: React.FC = () => {
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
                            label: 'Loss',
                            data: [4, 8, 10, 15, 18, 22, 28, 34, 50],
                            borderColor: '#6a5acd',
                            backgroundColor: 'rgba(106, 92, 205, 0.2)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 5,
                            pointBackgroundColor: '#6a5acd',
                        },
                    ],
                };

                const chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
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
                    type: 'line',
                    data: chartData,
                    options: chartOptions,
                });
            }
        }

        return () => destroyChart();
    }, []);

    return <canvas ref={chartRef} className='w-full h-full' />;
};

export default SalesChart;
