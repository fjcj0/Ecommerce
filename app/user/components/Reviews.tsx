import { userReviewsProps } from '@/global.t';
import Image from 'next/image';
import React from 'react';
const Reviews = ({ isOdd, user, review, rating, profilePicture }: userReviewsProps) => {
    return (
        <div
            className={`flex w-full items-start justify-start gap-5 px-10 pb-20 pt-9 rounded-xl ${isOdd ? 'bg-base-300' : 'bg-transparent'
                }`}
        >
            <div className="relative w-[80px] h-[80px] flex-shrink-0">
                <Image
                    src={profilePicture}
                    alt={user}
                    fill
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold font-raleway">{user}</h1>
                <div className="flex flex-col gap-4">
                    <p className="font-raleway">"{review}"</p>
                    <div className='flex items-center justify-start gap-3'>
                        <p className='text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm'>{rating}</p>
                        <div className="rating rating-md gap-3">
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Reviews;