"use client";
import React, { useEffect } from "react";
import Card from "./components/Card";
import SalesChart from "../charts/AdminCharts/SalesChart";
import ProductsChart from "../charts/AdminCharts/ProductsChart";
import TopProduct from "./components/TopProduct";
import useAdminDashboardInfoStore from "@/store/adminDashboardStore";
import { DollarSign, Box, Users, ListOrderedIcon } from 'lucide-react';
const Page = () => {
    const { getDashboardInformation, totalOrders, totalOrdersDelivered, percentAgeOfOrders, totalUsers, topProducts, totalProducts, isLoading } = useAdminDashboardInfoStore();
    useEffect(() => {
        getDashboardInformation();
    }, []);
    const cardsDashboard = [
        {
            icon: DollarSign,
            title: "Total Sales",
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
            title: "Orders Delivered",
            value: percentAgeOfOrders,
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardsDashboard.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        isMoney={card.isMoney} />
                ))}
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 font-raleway">
                <div className="w-full bg-base-300 flex flex-col items-center justify-center p-3 gap-5 rounded-xl">
                    <div className="flex w-full font-bold items-start justify-start">
                        <p className="text-primary bg-primary/30 px-3 py-1 rounded-lg ">Sales Last 9 Months</p>
                    </div>
                    <SalesChart />
                </div>
                <div className="w-full bg-base-300 flex flex-col items-center justify-center p-3 gap-5 rounded-xl">
                    <div className="flex w-full font-bold items-start justify-start">
                        <p className="text-primary bg-primary/30 px-3 py-1 rounded-lg ">Products Last 9 Months</p>
                    </div>
                    <ProductsChart />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-5">
                <div className="col-span-3 font-raleway">
                    <div className="w-full flex flex-col justify-start items-start gap-3 h-full bg-base-300 rounded-lg p-3">
                        <h1 className="font-bold">Total Order Delivered</h1>
                        <div className="w-full flex items-center justify-center h-full">
                            <div className="radial-progress text-primary text-5xl font-bold" style={{ "--value": 70, "--size": "13rem" }} role="progressbar">
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
                            {
                                topProducts.length ? (
                                    topProducts.map((product, index) => (
                                        <TopProduct
                                            key={index}
                                            name={product.product_name}
                                            image={product.image}
                                            sold={product.total_quantity_sold}
                                        />
                                    ))
                                ) : (
                                    <p>No shoes yet!!</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Page;