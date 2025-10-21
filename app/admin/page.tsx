"use client";
import React, { useEffect, useMemo } from "react";
import Card from "./components/Card";
import SalesChart from "../charts/AdminCharts/SalesChart";
import ProductsChart from "../charts/AdminCharts/ProductsChart";
import TopProduct from "./components/TopProduct";
import useAdminDashboardInfoStore from "@/store/adminDashboardStore";
import { DollarSign, Box, Users, ListOrderedIcon } from "lucide-react";

const Page = () => {
    const {
        getDashboardInformation,
        totalOrders,
        totalOrdersDelivered,
        percentAgeOfOrders,
        totalUsers,
        topProducts,
        totalProducts,
        isLoading,
        productsPerMonth,
        salesPerMonth,
    } = useAdminDashboardInfoStore();

    useEffect(() => {
        getDashboardInformation();
    }, []);

    // Transform productsPerMonth for Chart.js
    const transformedProductsData = useMemo(() => {
        if (!productsPerMonth || productsPerMonth.length === 0) return [];

        // Map each product to its month
        const mapped = productsPerMonth.map((p: any) => {
            const date = new Date(p.created_at);
            const month = date.toLocaleString("default", { month: "short" }); // "Jan", "Feb", ...
            return { month, total: 1 };
        });

        // Aggregate products by month
        const aggregated = mapped.reduce((acc: { month: string; total: number }[], curr: any) => {
            const existing = acc.find((a) => a.month === curr.month);
            if (existing) {
                existing.total += curr.total;
            } else {
                acc.push({ month: curr.month, total: curr.total });
            }
            return acc;
        }, []);

        // Sort months chronologically
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        aggregated.sort((a: any, b: any) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

        return aggregated;
    }, [productsPerMonth]);

    const cardsDashboard = [
        {
            icon: DollarSign,
            title: "Profits",
            value: useAdminDashboardInfoStore.getState().sumOfSales,
            isMoney: true,
        },
        {
            icon: Box,
            title: "Total Products",
            value: useAdminDashboardInfoStore.getState().totalProducts,
            isMoney: false,
        },
        {
            icon: Users,
            title: "Total Users",
            value: useAdminDashboardInfoStore.getState().totalUsers,
            isMoney: false,
        },
        {
            icon: ListOrderedIcon,
            title: "Total Orders Delivered",
            value: totalOrdersDelivered,
            isMoney: false,
        },
    ];

    if (isLoading) {
        return (
            <div className="w-full h-[80%] flex items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-3 flex flex-col gap-5">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardsDashboard.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        isMoney={card.isMoney}
                    />
                ))}
            </div>

            {/* Charts */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 font-raleway">
                <div className="w-full bg-base-300 flex flex-col items-center justify-center p-3 gap-5 rounded-xl">
                    <div className="flex w-full font-bold items-start justify-start">
                        <p className="text-primary bg-primary/30 px-3 py-1 rounded-lg ">Sales Last 9 Months</p>
                    </div>
                    <SalesChart data={salesPerMonth} />
                </div>

                <div className="w-full bg-base-300 flex flex-col items-center justify-center p-3 gap-5 rounded-xl">
                    <div className="flex w-full font-bold items-start justify-start">
                        <p className="text-primary bg-primary/30 px-3 py-1 rounded-lg ">Products Last 9 Months</p>
                    </div>
                    <ProductsChart data={transformedProductsData} />
                </div>
            </div>

            {/* Percentage and Top Products */}
            <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-5">
                <div className="col-span-3 font-raleway">
                    <div className="w-full flex flex-col justify-start items-start gap-3 h-full bg-base-300 rounded-lg p-3">
                        <h1 className="font-bold">percentAgeOfOrders</h1>
                        <div className="w-full flex items-center justify-center h-full">
                            <div
                                className="radial-progress text-primary text-5xl font-bold"
                                style={{
                                    "--value": percentAgeOfOrders.toFixed(0),
                                    "--size": "13rem",
                                } as React.CSSProperties}
                                role="progressbar"
                            >
                                {percentAgeOfOrders.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 font-raleway">
                    <div className="w-full flex flex-col justify-center items-center p-3 bg-base-300/80 rounded-lg">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="font-bold">Top Products</h1>
                            <button type="button" className="btn btn-outline">View All</button>
                        </div>
                        <div className="w-full flex flex-col items-start my-3 font-poppins max-h-56 gap-3 overflow-y-auto">
                            {topProducts.length ? (
                                topProducts.map((product, index) => (
                                    <TopProduct
                                        key={index}
                                        name={product.product_name}
                                        image={product.image}
                                        sold={product.total_quantity_sold}
                                    />
                                ))
                            ) : (
                                <p>No shoes sold yet!!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
