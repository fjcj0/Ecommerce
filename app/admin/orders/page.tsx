"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import useAdminStoreOrder from '@/store/adminOrderStore';
const Page = () => {
    const { orders, getOrders, isLoadingOrders, isDeletingOrder, deleteOrders, changeDeliverStatus, isChangingDeliverStatus } = useAdminStoreOrder();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [changingStatusOrderId, setChangingStatusOrderId] = useState<number | null>(null);
    const itemsPerPage = 10;
    useEffect(() => {
        getOrders();
    }, [getOrders]);
    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        return orders.filter((order: any) => {
            const searchLower = searchTerm.toLowerCase();
            const displayName = order.displayname?.toLowerCase() || '';
            const title = order.title?.toLowerCase() || '';

            return displayName.includes(searchLower) || title.includes(searchLower);
        });
    }, [orders, searchTerm]);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, endIndex);
    const handleOrderSelect = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };
    const handleSelectAll = () => {
        const currentPageOrderIds = currentOrders.map((order: any) => order.id);
        if (currentPageOrderIds.every((id: string) => selectedOrders.includes(id))) {
            setSelectedOrders(prev => prev.filter(id => !currentPageOrderIds.includes(id)));
        } else {
            setSelectedOrders(prev => {
                const newSelection = [...prev];
                currentPageOrderIds.forEach((id: string) => {
                    if (!newSelection.includes(id)) {
                        newSelection.push(id);
                    }
                });
                return newSelection;
            });
        }
    };
    const isAllSelected = currentOrders.length > 0 &&
        currentOrders.every((order: any) => selectedOrders.includes(order.id));
    const isSomeSelected = currentOrders.some((order: any) => selectedOrders.includes(order.id));
    const handleDeleteSelected = async () => {
        if (selectedOrders.length === 0) return;
        const orderIdsToDelete = selectedOrders.map(id => Number(id));
        console.log('Deleting orders:', orderIdsToDelete);
        await deleteOrders(orderIdsToDelete);
        setSelectedOrders([]);
        getOrders();
    };
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedOrders([]);
    };
    const handleOnChangeDeliverStatus = async (
        orderId: number,
        userId: number,
        shoeId: number,
        status: string,
        quantity: number,
        price: number
    ) => {
        setChangingStatusOrderId(orderId);
        try {
            await changeDeliverStatus(userId, shoeId, orderId, status, quantity, price);
            getOrders();
        } catch (error) {
            console.error('Failed to change deliver status:', error);
        } finally {
            setChangingStatusOrderId(null);
        }
    };
    if (isLoadingOrders) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    return (
        <div className='p-3 font-poppins h-full flex flex-col items-start justify-start gap-5'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search by user or product..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className='flex items-center justify-center gap-3'>
                    <button
                        type='button'
                        className='btn btn-circle bg-primary/30 hover:bg-primary hover:text-base-300'
                        onClick={handleDeleteSelected}
                        disabled={selectedOrders.length === 0 || isDeletingOrder}
                    >
                        {isDeletingOrder ? (
                            <span className='loading loading-spinner loading-sm'></span>
                        ) : (
                            <Trash size={23} />
                        )}
                    </button>
                </div>
            </div>
            <div className='w-full flex items-start justify-center'>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={isAllSelected}
                                            ref={input => {
                                                if (input) {
                                                    input.indeterminate = isSomeSelected && !isAllSelected;
                                                }
                                            }}
                                            onChange={handleSelectAll}
                                        />
                                    </label>
                                </th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Available</th>
                                <th>Quantity</th>
                                <th>Sizes</th>
                                <th>Deliver Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order: any, index: number) => {
                                const userId = order.user_id || order.userId;
                                const shoeId = order.shoe_id || order.shoeId;
                                const quantity = order.quantity || 0;
                                const price = order.final_price || order.price;
                                const status = order.status || 'pending';
                                return (
                                    <tr key={order.id || index} className={selectedOrders.includes(order.id) ? 'bg-base-200' : ''}>
                                        <th>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    checked={selectedOrders.includes(order.id)}
                                                    onChange={() => handleOrderSelect(order.id)}
                                                />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar sm:block hidden">
                                                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                                        <Image
                                                            src={order.profilePicture || order.profilepicture || '/default-avatar.png'}
                                                            alt={order.displayName || order.displayname || 'User'}
                                                            width={50}
                                                            height={50}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{order.displayname}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar sm:block hidden">
                                                    <Image
                                                        src={order.image_url || order.imageUrl || '/default-product.png'}
                                                        alt={order.title || 'Product'}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{order.title || 'Untitled Product'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${price}</td>
                                        <td>{order.available ? 'Yes' : 'No'}</td>
                                        <td>{quantity}</td>
                                        <td>
                                            {[
                                                order.xs && 'xs',
                                                order.s && 's',
                                                order.m && 'm',
                                                order.l && 'l',
                                                order.xl && 'xl'
                                            ].filter(Boolean).join(', ') || 'None'}
                                        </td>
                                        <td>
                                            <select
                                                className="select select-bordered select-sm w-full max-w-xs"
                                                value={status}
                                                onChange={(e) => handleOnChangeDeliverStatus(
                                                    Number(order.id),
                                                    Number(userId),
                                                    Number(shoeId),
                                                    e.target.value,
                                                    quantity,
                                                    price
                                                )}
                                                disabled={status === 'delivered' || changingStatusOrderId === order.id}
                                            >
                                                {changingStatusOrderId === order.id ? (
                                                    <option>Updating...</option>
                                                ) : (
                                                    <>
                                                        <option value='pending'>Pending</option>
                                                        <option value='delivered'>Delivered</option>
                                                        <option value="failed">Failed</option>
                                                    </>
                                                )}
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {totalPages > 1 && (
                <div className='w-full flex items-center justify-center'>
                    <div className="join flex">
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous page
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={`join-item btn btn-outline ${currentPage === page ? 'btn-active' : ''}`}
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
}
export default Page;