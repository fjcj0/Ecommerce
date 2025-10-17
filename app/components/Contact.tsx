import React from 'react';
const Contact = () => {
    return (
        <div className='mt-36 mb-10 w-full flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold font-raleway'>Contact Us</h1>
            <div className='flex flex-col gap-3 w-full mt-8'>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 px-3 gap-3'>
                    <input type="text" className='bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300
                font-raleway'
                        placeholder='First Name...' />
                    <input type="text" className='bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300
                font-raleway'
                        placeholder='Second Name...' />
                </div>
                <div className='w-full grid grid-cols-1  px-3 gap-3'>
                    <input type="text" className='bg-primary text-base-300 outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300
                font-raleway'
                        placeholder='Email..' />
                    <textarea className='bg-primary text-base-300 h-[7rem] outline-base-content px-3 py-2 rounded-lg placeholder:text-base-300
                font-raleway' placeholder='Write Preview....' />
                    <div className='flex items-start justify-normal'>
                        <button type='button' className='btn btn-primary font-raleway font-bold self-start'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact