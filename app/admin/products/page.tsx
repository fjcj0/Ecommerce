"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Trash, Edit } from "lucide-react";
import Image from "next/image";
import ModalEditProduct from "../components/ModalEditProduct";
import useProductAdmin from "@/store/productStore";
import { Span } from "next/dist/trace";
const ITEMS_PER_PAGE = 5;
const Page = () => {
    const { products, getProducts, isLoading, updateVisible, isLoadingVisible } = useProductAdmin();
    const [selectedRows, setSelectedRows] = useState<boolean[]>([]);
    const [allSelected, setAllSelected] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        getProducts();
    }, []);
    useEffect(() => {
        if (products) {
            setSelectedRows(new Array(products.length).fill(false));
        }
    }, [products]);
    const handleSelectAll = () => {
        const newValue = !allSelected;
        setAllSelected(newValue);
        setSelectedRows(new Array(products.length).fill(newValue));
    };
    const handleRowSelect = (index: number) => {
        const updatedRows = [...selectedRows];
        updatedRows[index] = !updatedRows[index];
        setSelectedRows(updatedRows);
        setAllSelected(updatedRows.every(Boolean));
    };
    const handleEdit = (product: any) => {
        setEditingProduct(product);
        const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
        dialog?.showModal();
    };
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter((p: any) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [products, searchQuery]);
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };
    const onChangeVisible = async (productId: number, value: boolean) => {
        await updateVisible(productId, value);
    };
    if (isLoading) {
        return (
            <div className="w-full h-[80%] flex items-center justify-center">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }
    return (
        <div className="p-3 font-poppins h-full flex flex-col items-start justify-start gap-5">
            <div className="w-full flex justify-between items-center">
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        className="btn btn-circle bg-primary/30 hover:bg-primary hover:text-base-300"
                    >
                        <Trash size={23} />
                    </button>
                    <p className="flex items-center justify-center font-raleway text-primary px-3 py-2 bg-primary/20 rounded-3xl">
                        Click twice edit button to modify product
                    </p>
                    <ModalEditProduct product={editingProduct} />
                </div>
            </div>
            <div className="w-full flex items-start justify-center">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                        />
                                    </label>
                                </th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Available</th>
                                <th>Quantity</th>
                                <th>Sizes</th>
                                <th>Visible</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!paginatedProducts || paginatedProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedProducts.map((product: any, index: number) => (
                                    <tr key={product.id}>
                                        <th>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    checked={selectedRows[index] || false}
                                                    onChange={() => handleRowSelect(index)}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar sm:block hidden">
                                                    <Image
                                                        src={product.images?.[0] || "/no-image.png"}
                                                        alt={product.title}
                                                        width={50}
                                                        height={50}
                                                        className="rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${product.price}</td>
                                        <td>{product.available}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            {["XS", "S", "M", "L", "XL"]
                                                .filter((size) => product[size.toLowerCase()])
                                                .join(", ")}
                                        </td>
                                        <td>
                                            {
                                                !isLoadingVisible ?

                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => onChangeVisible(product.id, e.target.checked)}
                                                        className="toggle"
                                                        checked={product.is_visible}
                                                    />
                                                    :
                                                    <span className="loading loading-infinity loading-md"></span>
                                            }
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-circle bg-primary/30 hover:bg-primary hover:text-base-300"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit size={23} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="join flex">
                    <button
                        className="join-item btn btn-outline"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button className="join-item btn btn-disabled">
                        Page {currentPage} of {totalPages || 1}
                    </button>
                    <button
                        className="join-item btn btn-outline"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Page;