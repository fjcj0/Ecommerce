import React from 'react';
import SalesChart from '../charts/UserCharts/SalesCahrt';
import { ArrowDownRight } from 'lucide-react';
import Sales from './components/Sales';
import UserInfo from './components/UserInfo';
import Credit from './components/Credit';
const page = () => {
    return (
        <div className='p-3'>
            <div className='w-full flex flex-col gap-5'>
                <div className='p-3 w-full bg-base-300 rounded-xl flex flex-col gap-4 h-[30rem]'>
                    <div className='w-full flex flex-col items-start justify-start'>
                        <h1 className='text-xl font-bold font-poppins  p-3 rounded-xl'>Money Lost: $12421.5</h1>
                        <div className='flex items-center justify-center gap-2 bg-primary/30 px-3 py-1 rounded-3xl' >
                            <ArrowDownRight size={20} />
                            <p>4% <span className='font-raleway'>more loses</span></p>
                        </div>
                    </div>
                    <div className='w-full h-[78%]'>
                        <SalesChart />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-5 w-full gap-3'>
                    <div className='md:col-span-3'>
                        <div className='w-full flex flex-col'>
                            <Sales />
                        </div>

                    </div>
                    <div className='md:col-span-2'>
                        <UserInfo />
                    </div>
                </div>
                <div className='grid grid-cols-1'>
                    <Credit />
                </div>
            </div>
        </div>
    );
}
export default page;