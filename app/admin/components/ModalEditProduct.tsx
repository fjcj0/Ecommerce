import React from 'react';
import { Image } from 'lucide-react';
const ModalEditProduct = () => {
    const sizes = ['XS', 'SM', 'M', 'L', 'XL'];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div>
                    <div className='p-3 w-full flex flex-col justify-start items-start'>
                        <div className='flex flex-col gap-3 w-full items-start justify-start'>
                            <div>
                                <h1 className='font-bold font-raleway text-5xl text-primary'>Edit Pictures</h1>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-5 gap-3 w-full'>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <button
                                        key={index}
                                        type='button'
                                        className='flex font-raleway p-5 font-medium text-lg w-full h-[7rem] bg-base-300 rounded-xl hover:bg-primary/50 hover:text-primary flex-col justify-center items-center'
                                    >
                                        <Image size={35} />
                                    </button>
                                ))}
                            </div>
                            <div className='w-full flex flex-col gap-5 font-raleway'>
                                <h1 className='text-primary font-bold text-5xl'>Create Information</h1>
                                <div className='flex flex-col items-start justify-start w-full gap-3'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-3'>
                                        <input type='text' className='input input-bordered' placeholder='title...' />
                                        <input type='number' step='0.01' min='0' className='input input-bordered' placeholder='price...' />
                                        <input type='number' className='input input-bordered' placeholder='quantity...' />
                                        <input type='number' step='0.01' min='0' className='input input-bordered' placeholder='discount...' />
                                        <input
                                            type='date'
                                            className='input input-bordered h-[8rem]'
                                            placeholder='Discount end...'
                                            min={minDate}
                                        />
                                        <textarea className='input input-bordered p-3 h-[8rem]' placeholder='description...' />
                                    </div>
                                    <div className='grid grid-cols-5 gap-3'>
                                        {sizes.map((size, index) => (
                                            <label key={index} className='flex flex-row gap-1'>
                                                <input type='checkbox' className='checkbox-primary' />
                                                <p>{size}</p>
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        type='button'
                                        className='font-bold px-4 py-2 text-primary border border-primary/50 rounded-lg hover:bg-primary/50'
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
export default ModalEditProduct;