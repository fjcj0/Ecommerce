"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Comment from '../../components/Comment';
import useProductAdmin from '@/store/productStore';
import { useParams } from 'next/navigation';
import useReviews from '@/store/reviewsStore';
import Reviews from '../../components/Reviews';
import useAuthStore from '@/store/authStore';
const Page = () => {
    const params = useParams();
    const { id }: any = params;
    const { product, getProduct, isLoading, isUserCheckout, error, clearError, clearProduct } = useProductAdmin();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [sizesChosen, setSizesChosen] = useState({
        'xs': false,
        's': false,
        'm': false,
        'l': false,
        'xl': false
    });
    const { userReviews, getUsersReviews, isLoadingReviews, isUserReviewLoading, getUserReview, userReview } = useReviews();
    const { user } = useAuthStore();
    const [quantity, setQuantity] = useState<number>(1);
    const [hasLoaded, setHasLoaded] = useState(false);
    const handleOnSelectSize = useCallback((size: string) => {
        setSizesChosen(prevState => ({
            ...prevState,
            [size.toLowerCase()]: !prevState[size.toLowerCase() as keyof typeof prevState]
        }));
    }, []);
    const selectedSizesCount = Object.values(sizesChosen).filter(Boolean).length;
    const averageRating = useMemo(() => {
        const allReviews = [];
        if (userReviews && userReviews.length > 0) {
            allReviews.push(...userReviews);
        }
        if (userReview && userReview.rating) {
            allReviews.push(userReview);
        }
        if (allReviews.length === 0) return 0;
        const totalRating = allReviews.reduce((sum: number, review: any) => {
            return sum + (review.rating || 0);
        }, 0);
        return Math.round((totalRating / allReviews.length) * 10) / 10;
    }, [userReviews, userReview]);
    const renderStars = useCallback((rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => {
                    if (index < fullStars) {
                        return (
                            <div key={index} className="text-yellow-400">
                                ★
                            </div>
                        );
                    } else if (index === fullStars && hasHalfStar) {
                        return (
                            <div key={index} className="text-yellow-400">
                                ★½
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className="text-gray-300">
                                ★
                            </div>
                        );
                    }
                })}
            </div>
        );
    }, []);
    const totalReviewsCount = useMemo(() => {
        let count = userReviews?.length || 0;
        if (userReview && userReview.rating) {
            count += 1;
        }
        return count;
    }, [userReviews, userReview]);
    useEffect(() => {
        if (id && user?.id) {
            setHasLoaded(false);
            getProduct(Number(id), Number(user.id));
        }
    }, [id, user?.id]);
    useEffect(() => {
        if (!isLoading && (product || error)) {
            setHasLoaded(true);
        }
    }, [isLoading, product, error]);
    useEffect(() => {
        if (product) {
            setSelectedImageIndex(0);
            setSizesChosen({
                'xs': false,
                's': false,
                'm': false,
                'l': false,
                'xl': false
            });
            setQuantity(1);
        }
    }, [product]);
    useEffect(() => {
        if (id && user?.id && product) {
            getUsersReviews(Number(id), user.id);
        }
    }, [id, user?.id, product]);
    useEffect(() => {
        if (product?.id && user?.id) {
            getUserReview(product.id, user.id);
        }
    }, [product?.id, user?.id]);
    const handleImageClick = useCallback((index: number) => {
        setSelectedImageIndex(index);
    }, []);
    useEffect(() => {
        return () => {
            clearError();
            clearProduct();
        };
    }, [clearError, clearProduct]);
    if (isLoading || !hasLoaded) {
        return (
            <div className='w-full flex items-center justify-center h-[80vh]'>
                <span className='loading loading-infinity loading-lg'></span>
            </div>
        );
    }
    if (error && hasLoaded) {
        return (
            <div className='w-full flex items-center justify-center h-[80vh]'>
                <div className="text-center">
                    <h1 className='font-raleway font-bold lg:text-6xl md:text-4xl text-2xl text-red-500 mb-4'>
                        Error Loading Product
                    </h1>
                    <p className="text-lg text-gray-600">{String(error)}</p>
                </div>
            </div>
        );
    }
    if (!isLoading && hasLoaded && (!product || !product.is_visible)) {
        return (
            <div className='w-full flex items-center justify-center h-[80vh]'>
                <h1 className='font-raleway font-bold lg:text-6xl md:text-4xl text-2xl text-center text-red-500'>
                    Error 404 - Page Not Found
                </h1>
            </div>
        );
    }
    if (!product) {
        return null;
    }
    return (
        <div className="p-3 flex flex-col gap-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-base-300 p-5 rounded-3xl">
                <div className="flex flex-col justify-center items-center relative gap-5">
                    {product.discount && (
                        <div className="absolute top-0 left-3 z-10">
                            <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm font-raleway shadow-md">
                                Discount: {product.discount}%
                            </p>
                        </div>
                    )}
                    {product.ends_in && (
                        <div className="absolute top-0 right-3 z-10">
                            <p className="text-primary bg-primary/30 px-3 py-2 rounded-3xl text-sm font-raleway shadow-md">
                                Ends In: {new Date(product.ends_in).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                    {product.images?.[selectedImageIndex] && (
                        <Image
                            src={product.images[selectedImageIndex]}
                            alt={product.title}
                            width={650}
                            height={650}
                            className="rounded-3xl object-contain transition-opacity duration-300"
                            priority
                        />
                    )}
                    <div className="grid grid-cols-5 gap-3 self-start">
                        {product.images.map((image: string, index: number) => (
                            <button
                                type='button'
                                key={index}
                                onClick={() => handleImageClick(index)}
                                className={`relative transition-all duration-200 rounded-xl border-2 ${index === selectedImageIndex
                                    ? 'transform scale-105 border-primary'
                                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    width={70}
                                    height={70}
                                    alt={`Thumbnail ${index + 1}`}
                                    className='rounded-xl object-contain'
                                />
                            </button>
                        ))}
                    </div>
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
                    <p className='px-4 py-2 bg-primary/30 text-primary font-poppins rounded-3xl'>Price: ${product.price}</p>
                    <div className="flex items-center justify-start gap-3">
                        <button
                            type="button"
                            className="btn btn-circle"
                            onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1);
                                }
                            }}
                            disabled={quantity <= 1}
                        >-</button>
                        <p className="text-primary font-bold bg-primary/30 px-2 py-2 w-[3rem] h-[3rem] flex items-center justify-center rounded-full">{quantity}</p>
                        <button
                            type="button"
                            className="btn btn-circle"
                            onClick={() => setQuantity(quantity + 1)}
                        >+</button>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-3 gap-3">
                            {product.xs !== false && (
                                <button
                                    type="button"
                                    className={`btn btn-circle ${sizesChosen.xs ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleOnSelectSize('xs')}
                                >
                                    XS
                                </button>
                            )}
                            {product.s !== false && (
                                <button
                                    type="button"
                                    className={`btn btn-circle ${sizesChosen.s ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleOnSelectSize('s')}
                                >
                                    S
                                </button>
                            )}
                            {product.m !== false && (
                                <button
                                    type="button"
                                    className={`btn btn-circle ${sizesChosen.m ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleOnSelectSize('m')}
                                >
                                    M
                                </button>
                            )}
                            {product.l !== false && (
                                <button
                                    type="button"
                                    className={`btn btn-circle ${sizesChosen.l ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleOnSelectSize('l')}
                                >
                                    L
                                </button>
                            )}
                            {product.xl !== false && (
                                <button
                                    type="button"
                                    className={`btn btn-circle ${sizesChosen.xl ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => handleOnSelectSize('xl')}
                                >
                                    XL
                                </button>
                            )}
                        </div>
                        {!product.xs && !product.s && !product.m && !product.l && !product.xl && (
                            <p className="text-warning">No sizes available for this product</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <p className="text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm">
                            {averageRating > 0 ? averageRating : 'No ratings yet'}
                        </p>
                        <div className="rating rating-md gap-3">
                            {renderStars(averageRating)}
                        </div>
                        {totalReviewsCount > 0 && (
                            <p className="text-sm text-gray-500">
                                ({totalReviewsCount} review{totalReviewsCount !== 1 ? 's' : ''})
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={selectedSizesCount === 0 || product.available === 0 || isUserCheckout == true}
                    >
                        {isUserCheckout == true ? 'Already in Checkout' :
                            selectedSizesCount === 0 ? 'Select Sizes' :
                                product.available === 0 ? 'Out of Stock' :
                                    'CheckOut'}
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl font-light font-raleway text-primary text-center">
                    User <span className="font-bold">Reviews</span>
                </h1>
                <div className="flex flex-col gap-5 max-h-[50rem] overflow-y-auto items-start justify-start w-full">
                    {!isUserReviewLoading && (
                        <Comment userReview={userReview} productId={product.id} />
                    )}
                    {!isLoadingReviews && userReviews != null && userReviews.map((userReview: any, index: number) => (
                        <Reviews
                            key={index}
                            user={userReview.displayname}
                            profilePicture={userReview.profilepicture}
                            rating={userReview.rating}
                            isOdd={index % 2 !== 0}
                            review={userReview.comment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Page;