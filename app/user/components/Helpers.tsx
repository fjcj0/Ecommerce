import React from 'react';
const Helpers = () => {
    const sizes = [
        'XS', 'SM', 'MD', 'L', 'XL'
    ];
    return (
        <div className='flex flex-col gap-3 w-full '>
            <div className='grid grid-cols-1 md:grid-cols-2 p-3 bg-base-300 gap-3 rounded-xl'>
                <div className='flex flex-col gap-3'>
                    <p className='font-raleway font-bold text-xl'>Price Between</p>
                    <p className='font-poppins font-bold'>$30 - $100</p>
                    <input type="range" min={30} max="100" defaultValue="30" className="range range-secondary" />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className=''>
                        <h1 className='font-bold font-raleway text-xl'>Sizes</h1>
                    </div>
                    <div className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-5 gap-3 mr-auto'>
                        {
                            sizes.map((size, index) => (
                                <button key={index} type='button' className='btn btn-circle font-raleway font-bold'>
                                    {size}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="p-4  flex md:flex-col flex-row md:justify-start md:items-start justify-between items-center bg-base-300 gap-4 rounded-xl">
                <input
                    type="search"
                    className="input input-bordered w-full md:w-auto"
                    placeholder="Search..."
                />
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold font-raleway">Not Available</h1>
                    <input type="checkbox" className="toggle" />
                </div>
            </div>
        </div>
    );
}
export default Helpers;