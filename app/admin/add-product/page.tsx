"use client";
import React, { useState, ChangeEvent } from 'react';
import { Image, X } from 'lucide-react';
import { baseUrl, imagesStateProps, sizesStateProps } from '@/global.t';
import axios from 'axios';
import useProductAdmin from '@/store/productStore';
import toast from 'react-hot-toast';
const Page = () => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    const [imagesLoading, setImagesLoading] = useState({
        image1: false,
        image2: false,
        image3: false,
        image4: false,
        image5: false
    });
    const [sizesChosen, setSizesChosen] = useState<sizesStateProps>({
        xs: false,
        s: false,
        m: false,
        l: false,
        xl: false
    });
    const [imagesAddedBase64, setImagesAddedBase64] = useState<imagesStateProps>({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null
    });
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [discount, setDiscount] = useState<string>('');
    const [endsIn, setEndsIn] = useState('');
    const [description, setDescription] = useState('');
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        const imageKey = `image${index + 1}` as keyof imagesStateProps;
        reader.onloadend = async () => {
            const imageBase64 = reader.result as string;
            try {
                setImagesLoading(prev => ({ ...prev, [imageKey]: true }));
                const response = await axios.post(`${baseUrl}/api/upload-picture`, { imageBase64 });
                setImagesAddedBase64(prev => ({
                    ...prev,
                    [imageKey]: response?.data?.imageUrl || imageBase64
                }));
            } catch (error: unknown) {
                console.log('Error uploading image:', error instanceof Error ? error.message : error);
            } finally {
                setImagesLoading(prev => ({ ...prev, [imageKey]: false }));
            }
        };
        reader.readAsDataURL(file);
    };
    const removeImage = (index: number) => {
        const imageKey = `image${index + 1}` as keyof imagesStateProps;
        setImagesAddedBase64(prev => ({ ...prev, [imageKey]: null }));
    };
    const toggleSize = (size: string) => {
        setSizesChosen(prev => ({
            ...prev,
            [size.toLowerCase()]: !prev[size.toLowerCase() as keyof sizesStateProps]
        }));
    };
    const { createProduct, isLoading } = useProductAdmin();
    const onCreate = async () => {
        try {
            const hasImages = Object.values(imagesAddedBase64).some(img => img !== null);
            const hasSizes = Object.values(sizesChosen).some(selected => selected);
            if (!title.trim()) {
                toast.error("Title is required");
                return;
            }
            if (!price || parseFloat(price) <= 0) {
                toast.error("Price must be greater than 0");
                return;
            }
            if (!quantity || parseInt(quantity) <= 0) {
                toast.error("Quantity must be greater than 0");
                return;
            }
            if (!hasImages) {
                toast.error("At least one image is required");
                return;
            }
            if (!hasSizes) {
                toast.error("Select at least one size");
                return;
            }
            await createProduct({
                imagesAddedBase64,
                sizesChosen,
                quantity: parseInt(quantity) || 0,
                discount: parseFloat(discount) || 0,
                title,
                price: parseFloat(price) || 0,
                endsIn,
                description
            });
            setImagesAddedBase64({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null
            });
            setSizesChosen({
                xs: false,
                s: false,
                m: false,
                l: false,
                xl: false
            });
            setTitle('');
            setPrice('');
            setQuantity('');
            setDescription('');
            setDiscount('');
            setEndsIn('');
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : String(error));
        }
    };
    return (
        <div className='p-3 w-full flex flex-col justify-start items-start'>
            <div className='flex flex-col gap-3 w-full items-start justify-start'>
                <h1 className='font-bold font-raleway text-5xl text-primary'>Add Pictures</h1>
                <div className='grid grid-cols-2 md:grid-cols-5 gap-3 w-full'>
                    {Array.from({ length: 5 }).map((_, index) => {
                        const imageKey = `image${index + 1}` as keyof imagesStateProps;
                        const imageSrc = imagesAddedBase64[imageKey];
                        const isLoading = imagesLoading[imageKey];
                        return (
                            <div key={index} className='relative w-full h-[20rem]'>
                                {imageSrc !== null ? (
                                    <>
                                        <img
                                            src={imageSrc}
                                            alt={`uploaded ${index + 1}`}
                                            className='w-full h-full object-contain rounded-xl'
                                        />
                                        <button
                                            type='button'
                                            onClick={() => removeImage(index)}
                                            className='absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100'
                                        >
                                            <X size={18} className='text-red-500' />
                                        </button>
                                    </>
                                ) : isLoading ? (
                                    <div className='flex justify-center items-center w-full h-full bg-base-300 rounded-xl'>
                                        <span className="loading loading-infinity loading-md"></span>
                                    </div>
                                ) : (
                                    <label className='flex flex-col justify-center items-center w-full h-full bg-base-300 rounded-xl cursor-pointer hover:bg-primary/50 hover:text-primary'>
                                        <Image size={35} />
                                        <span>Choose Picture</span>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            className='hidden'
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                    </label>
                                )}
                            </div>
                        );
                    })}
                </div>
                <h1 className='text-primary font-bold text-5xl mt-5'>Create Information</h1>
                <div className='flex flex-col items-start justify-start w-full gap-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-3'>
                        <input
                            type='text'
                            className='input input-bordered'
                            placeholder='title...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="input input-bordered"
                            placeholder="price..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            step="1"
                            min="0"
                            className="input input-bordered"
                            placeholder="quantity..."
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="input input-bordered"
                            placeholder="discount..."
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                        <input
                            type='date'
                            className='input input-bordered h-[8rem]'
                            placeholder='Discount end...'
                            min={minDate}
                            value={endsIn}
                            onChange={(e) => setEndsIn(e.target.value)}
                        />
                        <textarea
                            className='input input-bordered p-3 h-[8rem]'
                            placeholder='description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-5 gap-3'>
                        {sizes.map((size, index) => (
                            <label key={index} className='flex flex-row gap-1 items-center cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='checkbox-primary'
                                    checked={sizesChosen[size.toLowerCase() as keyof sizesStateProps]}
                                    onChange={() => toggleSize(size)}
                                />
                                <p>{size}</p>
                            </label>
                        ))}
                    </div>
                    <button
                        type='button'
                        className={`font-bold px-4 py-2 text-primary border border-primary/50 rounded-lg hover:bg-primary/50
                         ${isLoading ? 'opacity-50' : ''}`}
                        disabled={isLoading}
                        onClick={onCreate}
                    >
                        {
                            isLoading ?
                                <span className=' loading loading-infinity loading-md'></span>
                                : "Create"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Page;