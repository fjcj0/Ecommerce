import React from 'react';
import { Trash, Edit } from 'lucide-react';
import { orders, products, reviews } from '@/data/data';
import Image from 'next/image';
const page = () => {
    return (
        <div className='p-3 font-poppins h-full flex flex-col items-start justify-start gap-5'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />
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
                    <button type='button' className='btn btn-circle bg-primary/30 hover:bg-primary hover:text-base-300'><Trash size={23} /></button>
                </div>
            </div>
            <div className='w-full flex items-start justify-center'>
                <div className="overflow-x-auto w-full">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Rate</th>
                                <th>Review</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar sm:block hidden">
                                                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                                    <Image
                                                        src={review.profilePic}
                                                        alt={review.user}
                                                        width={50}
                                                        height={50}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{review.user}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar sm:block hidden">
                                                <Image src={review.productImage} alt={review.product} width={50} height={50} />
                                            </div>
                                            <div>
                                                <div className="font-bold">{review.product}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${review.rate.toFixed(2)}</td>
                                    <td colSpan={2}>
                                        <div className='max-h-20 overflow-y-auto'>
                                            {review.review}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
            <div className='w-full flex items-center justify-center'>
                <div className="join flex">
                    <button className="join-item btn btn-outline">Previous page</button>
                    <button className="join-item btn btn-outline">Next</button>
                </div>
            </div>
        </div >
    );
}
export default page;