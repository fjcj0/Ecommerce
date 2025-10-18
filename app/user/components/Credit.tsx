import Image from 'next/image';
import React from 'react';
const Credit = () => {
    return (
        <div className='w-full flex justify-between items-center bg-base-300 p-5 h-[7rem] rounded-md font-raleway'>
            <div className='flex flex-col justify-between items-start w-full h-full'>
                <p className=' text-sm font-bold opacity-50'>Credit Balance</p>
                <p className='font-poppins font-bold text-xl'>$25,215</p>
            </div>
            <div className=' h-full items-center justify-center'>
                <Image src={'/credit.png'} width={100} height={100} alt='credit' />
            </div>
        </div>
    );
}
export default Credit;