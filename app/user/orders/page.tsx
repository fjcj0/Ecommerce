'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import useUserOrderStore from '@/store/userOrderStore';
import useAuthStore from '@/store/authStore';
const Page = () => {
    const { orders, getOrders, isLoadingOrders } = useUserOrderStore();
    const { user } = useAuthStore();
    useEffect(() => {
        if (user?.id) {
            getOrders(Number(user?.id));
        }
    }, [user?.id, getOrders]);
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
                    <input type="text" className="grow" placeholder="Search" />
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
                                <th></th>
                                <th>quantity</th>
                                <th>Deliver Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.length > 0 ? (
                                orderList.map((order: any, index: number) => (
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
                                        <td colSpan={2}>
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
                                    <td colSpan={6} className="text-center py-8">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="join flex">
                    <button className="join-item btn btn-outline">Previous</button>
                    <button className="join-item btn btn-outline">Next</button>
                </div>
            </div>
        </div>
    );
};
export default Page;