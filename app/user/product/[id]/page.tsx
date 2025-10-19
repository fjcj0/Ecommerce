import React from 'react';
import { product } from '@/data/data';
import Image from 'next/image';
import { userReviews } from '@/data/data';
import Reviews from '../../components/Reviews';
const page = () => {
    return (
        <div className="p-3 flex flex-col gap-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-base-300 p-5 rounded-3xl">
                <div className="flex justify-center items-center relative">
                    <div className="absolute top-0 left-3">
                        <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm font-raleway shadow-md">
                            Discount: {20.3}%
                        </p>
                    </div>
                    <div className="absolute top-0 right-3">
                        <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm font-raleway shadow-md">
                            Ends In: {"2/10/2026"}
                        </p>
                    </div>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={650}
                        height={650}
                        className="rounded-3xl object-contain"
                    />
                </div>
                <div className="flex flex-col items-start justify-center gap-5">
                    <div className="flex items-start justify-start gap-3 font-raleway font-medium">
                        <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm">
                            Quantity: {product.quantity}
                        </p>
                        <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm">
                            {product.available > 0 ? 'available' : 'not available'}
                        </p>
                    </div>
                    <h1 className="text-5xl text-primary font-raleway">{product.title}</h1>
                    <p className="text-primary font-raleway text-md font-medium max-w-lg lg:max-w-3xl">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-start gap-3">
                        <button type="button" className="btn btn-circle">
                            -
                        </button>
                        <p className="text-primary font-bold bg-primary/30 p-3 rounded-full">
                            {product.quantity}
                        </p>
                        <button type="button" className="btn btn-circle">
                            +
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {product.sizes.map((size, index) => (
                            <button type="button" className="btn btn-circle" key={index}>
                                {size}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <p className="text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm">3.5</p>
                        <div className="rating rating-md gap-3">
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary">
                        CheckOut
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl font-light font-raleway text-primary text-center">
                    User <span className="font-bold">Reviews</span>
                </h1>
                <div className="flex flex-col gap-5 max-h-[50rem] overflow-y-auto items-start justify-start w-full">
                    {userReviews.map((userReview, index) => (
                        <Reviews
                            key={index}
                            user={userReview.user}
                            profilePicture={userReview.profilePic}
                            rating={userReview.rate}
                            isOdd={index % 2 !== 0}
                            review={userReview.review}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default page;