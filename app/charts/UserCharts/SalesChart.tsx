import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartOptions,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { SalesChartProps } from '@/global.t';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
const SalesChart: React.FC<SalesChartProps> = ({
    monthlySales,
    chartType = 'bar'
}) => {
    const processChartData = () => {
        if (!monthlySales || Object.keys(monthlySales).length === 0) {
            return {
                labels: [],
                datasets: [
                    {
                        label: 'Revenue ($)',
                        data: [],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Sales Count',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        yAxisID: 'y1',
                    },
                ],
            };
        }
        const months = Object.keys(monthlySales).sort();
        const revenueData = months.map(month => monthlySales[month].revenue);
        const salesCountData = months.map(month => monthlySales[month].salesCount);
        return {
            labels: months.map(month => {
                const [year, monthNum] = month.split('-');
                const date = new Date(parseInt(year), parseInt(monthNum) - 1);
                return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            }),
            datasets: [
                {
                    label: 'Revenue ($)',
                    data: revenueData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    yAxisID: 'y',
                },
                {
                    label: 'Sales Count',
                    data: salesCountData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    yAxisID: 'y1',
                },
            ],
        };
    };
    const chartData = processChartData();
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
                type: 'category' as const,
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Revenue ($)',
                },
                beginAtZero: true,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Sales Count',
                },
                beginAtZero: true,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Sales Overview',
            },
        },
    };
    const barOptions: ChartOptions<'bar'> = {
        ...commonOptions,
    };
    const lineOptions: ChartOptions<'line'> = {
        ...commonOptions,
    };
    const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Revenue Distribution',
            },
        },
    };
    const doughnutData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Revenue ($)',
                data: chartData.datasets[0].data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };
    const renderChart = () => {
        if (!monthlySales || Object.keys(monthlySales).length === 0) {
            return (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">No sales data available</p>
                </div>
            );
        }
        switch (chartType) {
            case 'line':
                return <Line data={chartData} options={lineOptions} />;
            case 'doughnut':
                return <Doughnut data={doughnutData} options={doughnutOptions} />;
            case 'bar':
            default:
                return <Bar data={chartData} options={barOptions} />;
        }
    };
    return (
        <div className="sales-chart w-full h-full">
            {renderChart()}
        </div>
    );
};
export default SalesChart;