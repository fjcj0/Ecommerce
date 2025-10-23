"use client";
import React, { useEffect } from 'react';
import { ArrowDownRight } from 'lucide-react';
import Sales from './components/Sales';
import UserInfo from './components/UserInfo';
import Credit from './components/Credit';
import useUserDashboardInformationStore from '@/store/userDashbaordStore';
import useAuthStore from '@/store/authStore';
import { MonthlySales } from '@/global.t';
import SalesChart from '../charts/UserCharts/SalesChart';
const DashboardPage = () => {
    const { information, getInformation, isLoading } = useUserDashboardInformationStore();
    const { user } = useAuthStore();
    useEffect(() => {
        if (user?.id) {
            getInformation(user.id);
        }
    }, [user?.id, getInformation]);
    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    if (!user) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <h1 className='text-3xl font-bold font-raleway'>You need to login to view this page</h1>
            </div>
        );
    }
    if (!isLoading && (information === undefined || information === null)) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <h1 className='text-3xl font-bold font-raleway'>No information available</h1>
            </div>
        );
    }
    const monthlySales: MonthlySales = information?.monthlySales || {};
    return (
        <div className='p-3'>
            <div className='w-full flex flex-col gap-5'>
                <div className='p-3 w-full bg-base-300 rounded-xl flex flex-col gap-4 h-[30rem]'>
                    <div className='w-full flex flex-col items-start justify-start'>
                        <h1 className='text-xl font-bold font-poppins p-3 rounded-xl'>
                            Money Lost: ${information?.totalRevenue || 0}
                        </h1>
                    </div>
                    <div className='w-full h-[100%]'>
                        <SalesChart monthlySales={monthlySales} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-5 w-full gap-3'>
                    <div className='md:col-span-3'>
                        <div className='w-full flex flex-col'>
                            <Sales data={information?.lastFiveProducts || []} />
                        </div>
                    </div>
                    <div className='md:col-span-2'>
                        <UserInfo
                            totalOrders={information?.totalOrders || 0}
                            totalPurchase={information?.totalSales || 0}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-1'>
                    <Credit data={information?.deliveredOrders || 0} />
                </div>
            </div>
        </div>
    );
}
export default DashboardPage;