"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { userReviews } from '@/data/data';
import Reviews from '../../components/Reviews';
import Comment from '../../components/Comment';
import useProductAdmin from '@/store/productStore';
import { useParams } from 'next/navigation';
const Page = () => {
    const params = useParams();
    const { id }: any = params;
    const isAuthCommented: boolean = true;
    const { product, getProduct, isLoading } = useProductAdmin();
    useEffect(() => {
        if (id) getProduct(Number(id));
    }, [id]);
    if (isLoading) {
        return (
            <div className='w-full flex items-center justify-center h-[80%]'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    if (!isLoading && !product) {
        return (
            <div className='w-full flex items-center justify-center h-[80%]'>
                <h1 className='font-raleway font-bold lg:text-8xl md:text-6xl text-3xl text-center text-red-500'>Error 404 Page Not Found</h1>
            </div>
        );
    }
    if (!isLoading && product && !product.is_visible) {
        return (
            <div className='w-full flex items-center justify-center h-[80%]'>
                <h1 className='font-raleway font-bold lg:text-8xl md:text-6xl text-3xl text-center text-red-500'>Error 404 Page Not Found</h1>
            </div>
        );
    }
    return (
        <div className="p-3 flex flex-col gap-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-base-300 p-5 rounded-3xl">
                <div className="flex justify-center items-center relative">
                    {product.discount && (
                        <div className="absolute top-0 left-3">
                            <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm font-raleway shadow-md">
                                Discount: {product.discount}%
                            </p>
                        </div>
                    )}
                    {product.ends_in && (
                        <div className="absolute top-0 right-3">
                            <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm font-raleway shadow-md">
                                Ends In: {new Date(product.ends_in).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                    {product.images?.[0] && (
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={650}
                            height={650}
                            className="rounded-3xl object-contain"
                        />
                    )}
                </div>
                <div className="flex flex-col items-start justify-center gap-5">
                    <div className="flex items-start justify-start gap-3 font-raleway font-medium">
                        <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm">
                            Quantity: {product.quantity}
                        </p>
                        <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm">
                            {product.available > 0 ? 'Available' : 'Not Available'}
                        </p>
                    </div>
                    <h1 className="text-5xl text-primary font-raleway">{product.title}</h1>
                    <p className="text-primary font-raleway text-md font-medium max-w-lg lg:max-w-3xl">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-start gap-3">
                        <button type="button" className="btn btn-circle">-</button>
                        <p className="text-primary font-bold bg-primary/30 px-2 py-2 w-[3rem] h-[3rem] flex items-center justify-center  rounded-full">1</p>
                        <button type="button" className="btn btn-circle">+</button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {['xs', 's', 'm', 'l', 'xl'].filter(size => product[size]).map((size, idx) => (
                            <button type="button" className="btn btn-circle" key={idx}>{size.toUpperCase()}</button>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <p className="text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm">3.5</p>
                        <div className="rating rating-md gap-3">
                            {[...Array(5)].map((_, i) => (
                                <input key={i} disabled={true} type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400 pointer-events-none" />
                            ))}
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
                    {isAuthCommented ? <Comment /> : <div>No Comments</div>}
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
export default Page;