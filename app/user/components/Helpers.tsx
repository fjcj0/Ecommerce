"use client";
import React from "react";
import { useProduct } from "@/app/context/productContext";
const Helpers = () => {
    const {
        priceBetween,
        setPriceBetween,
        selectedSizes,
        setSelectedSizes,
        search,
        setSearch,
        displayNotAvailable,
        setDisplayNotAvailable,
    } = useProduct();
    const sizes = ["XS", "S", "M", "L", "XL"];
    const toggleSize = (size: string) => {
        setSelectedSizes((prev) => ({
            ...prev,
            [size]: !prev[size as keyof typeof prev],
        }));
    };
    return (
        <div className="flex flex-col gap-3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 p-3 bg-base-300 gap-3 rounded-xl">
                <div className="flex flex-col gap-3">
                    <p className="font-raleway font-bold text-xl">Price Between</p>
                    <p className="font-poppins font-bold">
                        ${priceBetween.min} - ${priceBetween.max}
                    </p>

                    <label className="font-raleway text-sm">Min Price</label>
                    <input
                        type="range"
                        min={0}
                        max={priceBetween.max}
                        value={priceBetween.min}
                        onChange={(e) =>
                            setPriceBetween((prev) => ({
                                ...prev,
                                min: Number(e.target.value),
                            }))
                        }
                        className="range range-secondary"
                    />

                    <label className="font-raleway text-sm">Max Price</label>
                    <input
                        type="range"
                        min={priceBetween.min}
                        max={500}
                        value={priceBetween.max}
                        onChange={(e) =>
                            setPriceBetween((prev) => ({
                                ...prev,
                                max: Number(e.target.value),
                            }))
                        }
                        className="range range-secondary"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold font-raleway text-xl">Sizes</h1>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-5 gap-3 mr-auto">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`btn btn-circle font-raleway font-bold ${selectedSizes[size as keyof typeof selectedSizes]
                                    ? "btn-secondary"
                                    : ""
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-4 flex md:flex-col flex-row md:justify-start md:items-start justify-between items-center bg-base-300 gap-4 rounded-xl">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full md:w-auto"
                    placeholder="Search..."
                />
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold font-raleway">Not Available</h1>
                    <input
                        type="checkbox"
                        checked={displayNotAvailable}
                        onChange={(e) => setDisplayNotAvailable(e.target.checked)}
                        className="toggle"
                    />
                </div>
            </div>
        </div>
    );
};
export default Helpers;