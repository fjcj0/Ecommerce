import React from "react";
import { cardsDashboard, topProducts } from "@/data/data";
import Card from "./components/Card";
import SalesChart from "../charts/AdminCharts/SalesChart";
import ProductsChart from "../charts/AdminCharts/ProductsChart";
import TopProduct from "./components/TopProduct";
const Page = () => {
    return (
        <div className="p-3 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardsDashboard.map((card, index) => (
                    <Card
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        isMoney={card.isMoney}
                        increase={card.increase}
                        decrease={card.decrease}
                    />
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
                            <div className="radial-progress text-primary text-5xl" style={{ "--value": 70, "--size": "13rem" }} role="progressbar">
                                70%
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
                        <div className="w-full flex flex-col items-start my-3 max-h-56 gap-3 overflow-y-auto">
                            {topProducts.map((product, index) => (
                                <TopProduct
                                    key={index}
                                    name={product.name}
                                    image={product.image}
                                    increase={product.increase}
                                    decrease={product.decrease}
                                    sold={product.sold}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Page;