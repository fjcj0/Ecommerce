'use client';
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import useUserOrderStore from '@/store/userOrderStore';
import useAuthStore from '@/store/authStore';
const Page = () => {
    const { orders, getOrders, isLoadingOrders } = useUserOrderStore();
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    useEffect(() => {
        if (user?.id) {
            getOrders(Number(user?.id));
        }
    }, [user?.id, getOrders]);
    const filteredOrders = useMemo(() => {
        const orderList = Array.isArray(orders) ? orders : [];
        if (!searchTerm.trim()) return orderList;
        return orderList.filter(order =>
            order.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    if (isLoadingOrders) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    const orderList = Array.isArray(orders) ? orders : [];
    return (
        <div className="p-3 font-poppins h-full flex flex-col items-start justify-start gap-5">
            <div className="w-full flex justify-between items-center">
                <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
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
            <div className="w-full flex items-start justify-center">
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Sizes</th>
                                <th>Quantity</th>
                                <th>Delivery Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order: any, index: number) => (
                                    <tr key={order.id || index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className='md:block hidden'>
                                                    <Image
                                                        src={order.image_url}
                                                        alt={order.title}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                                <span className="font-bold">{order.title}</span>
                                            </div>
                                        </td>
                                        <td>${order.final_price}</td>
                                        <td>
                                            {[
                                                order.xs && 'xs',
                                                order.s && 's',
                                                order.m && 'm',
                                                order.l && 'l',
                                                order.xl && 'xl'
                                            ].filter(Boolean).join(', ') || 'None'}
                                        </td>
                                        <td>{order.quantity}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`w-3 h-3 rounded-full ${order.status === 'delivered'
                                                        ? 'bg-green-500'
                                                        : order.status === 'pending'
                                                            ? 'bg-yellow-400'
                                                            : 'bg-red-500'
                                                        }`}
                                                ></span>
                                                <span className="capitalize">{order.status}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-8">
                                        {searchTerm ? 'No orders found matching your search' : 'No orders found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {totalPages > 1 && (
                <div className="w-full flex items-center justify-center">
                    <div className="join">
                        {/* Previous Button */}
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {getPageNumbers().map(page => (
                            <button
                                key={page}
                                className={`join-item btn btn-outline ${currentPage === page ? 'btn-active' : ''
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePageChange(currentPage + 1)}
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
export default Page;