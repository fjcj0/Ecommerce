"use client";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import useProductAdmin from "@/store/productStore";
import { useProduct } from "@/app/context/productContext";
const Products = () => {
    const { getProducts, products, isLoading } = useProductAdmin();
    const {
        setProducts,
        filteredProducts,
        paginatedProducts,
        currentPage,
        setCurrentPage,
        totalPages
    } = useProduct();
    useEffect(() => {
        getProducts()
    }, []);
    useEffect(() => {
        if (products.length > 0) {
            setProducts(products);
        }
    }, [products, setProducts]);
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };
    if (isLoading) {
        return (
            <div className="w-full md:h-[100vh] h-[50vh] flex items-center justify-center">
                <span className="loading loading-infinity loading-md"></span>
            </div>
        );
    }
    return (
        <div className="flex flex-col mb-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-2">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product: any, index: number) => {
                        const sizes: string[] = [];
                        if (product.xs) sizes.push("XS");
                        if (product.s) sizes.push("S");
                        if (product.m) sizes.push("M");
                        if (product.l) sizes.push("L");
                        if (product.xl) sizes.push("XL");
                        return (
                            <ProductCard
                                key={product.id || index}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                sizes={sizes}
                                image={product.images?.[0]}
                                available={product.available}
                                quantity={product.quantity}
                                is_visible={product.is_visible}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full md:h-[50vh] flex items-center justify-center text-center font-raleway text-primary">
                        No products match your filters
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="w-full flex items-center justify-center my-3">
                    <div className="join">
                        <button
                            className="join-item btn btn-outline"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`join-item btn btn-outline ${currentPage === page ? 'btn-active' : ''
                                    }`}
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="join-item btn btn-outline"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Products;