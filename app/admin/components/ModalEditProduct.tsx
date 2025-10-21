"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Image, X } from "lucide-react";
import { baseUrl, imagesStateProps } from "@/global.t";
import axios from "axios";
import toast from "react-hot-toast";
import useProductAdmin from "@/store/productStore";
const ModalEditProduct = ({ product }: { product: any }) => {
    const { updateProduct, isLoadingModal, getProducts } = useProductAdmin();
    const sizes = ["XS", "S", "M", "L", "XL"];
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];
    const [imagesLoading, setImagesLoading] = useState({
        image1: false,
        image2: false,
        image3: false,
        image4: false,
        image5: false,
    });
    const [imagesAddedBase64, setImagesAddedBase64] = useState<imagesStateProps>({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
    });
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [discount, setDiscount] = useState("");
    const [endsIn, setEndsIn] = useState("");
    const [description, setDescription] = useState("");
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const removeImage = async (index: number) => {
        const imageKey = `image${index + 1}` as keyof imagesStateProps;
        const imageUrl = imagesAddedBase64[imageKey];
        if (!imageUrl || !product?.id) return;
        try {
            setImagesLoading((prev) => ({ ...prev, [imageKey]: true }));
            await axios.delete(`${baseUrl}/api/picture/${product.id}`, {
                data: { url: imageUrl },
            });
            setImagesAddedBase64((prev) => ({ ...prev, [imageKey]: null }));
            toast.success("Image deleted successfully!");
        } catch (error: unknown) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete image!");
        } finally {
            setImagesLoading((prev) => ({ ...prev, [imageKey]: false }));
        }
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file || !product?.id) return;
        const reader = new FileReader();
        const imageKey = `image${index + 1}` as keyof imagesStateProps;
        reader.onloadend = async () => {
            const imageBase64 = reader.result as string;
            try {
                setImagesLoading((prev) => ({ ...prev, [imageKey]: true }));
                const response = await axios.post(`${baseUrl}/api/picture/${product.id}`, {
                    imageBase64,
                });
                setImagesAddedBase64((prev) => ({
                    ...prev,
                    [imageKey]: response?.data?.image || imageBase64,
                }));
                toast.success("Image uploaded successfully!");
            } catch (error: unknown) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image!");
            } finally {
                setImagesLoading((prev) => ({ ...prev, [imageKey]: false }));
            }
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (product) {
            setTitle(product.title || "");
            setPrice(product.price || "");
            setQuantity(product.quantity || "");
            setDiscount(product.discount || "");
            setEndsIn(product.ends_in ? product.ends_in.split("T")[0] : "");
            setDescription(product.description || "");
            const sizesSelected = sizes.filter((size) => product[size.toLowerCase()]);
            setSelectedSizes(sizesSelected);
            setImagesAddedBase64({
                image1: product.images?.[0] || null,
                image2: product.images?.[1] || null,
                image3: product.images?.[2] || null,
                image4: product.images?.[3] || null,
                image5: product.images?.[4] || null,
            });
        }
    }, [product]);
    const toggleSize = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };
    const onSubmit = async () => {
        if (!product?.id) return;
        try {
            const sizesChosen = [
                selectedSizes.includes("XS"),
                selectedSizes.includes("S"),
                selectedSizes.includes("M"),
                selectedSizes.includes("L"),
                selectedSizes.includes("XL"),
            ];
            await updateProduct(product.id, {
                sizesChosen,
                quantity: Number(quantity),
                discount: Number(discount),
                title,
                price: Number(price),
                endsIn,
                description,
            });
            await getProducts();
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    };
    if (!product) {
        return null;
    }
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="p-3 w-full flex flex-col justify-start items-start">
                    <div className="flex flex-col gap-3 w-full items-start justify-start">
                        <h1 className="font-bold font-raleway text-5xl text-primary">
                            Edit Pictures
                        </h1>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full">
                            {Array.from({ length: 5 }).map((_, index) => {
                                const imageKey = `image${index + 1}` as keyof imagesStateProps;
                                const imageSrc = imagesAddedBase64[imageKey];
                                const isLoading = imagesLoading[imageKey];
                                return (
                                    <div key={index} className="relative w-full h-[5rem]">
                                        {isLoading ? (
                                            <div className="flex justify-center items-center w-full h-full bg-base-300 rounded-xl">
                                                <span className="loading loading-infinity loading-md"></span>
                                            </div>
                                        ) : imageSrc ? (
                                            <>
                                                <img
                                                    src={imageSrc}
                                                    alt={`uploaded ${index + 1}`}
                                                    className="w-full h-full object-contain rounded-xl"
                                                />
                                                <button
                                                    type="button"
                                                    disabled={isLoading}
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                                                >
                                                    {isLoading ? (
                                                        <span className="loading loading-spinner loading-xs text-red-500"></span>
                                                    ) : (
                                                        <X size={18} className="text-red-500" />
                                                    )}
                                                </button>
                                            </>
                                        ) : (
                                            <label className="flex flex-col justify-center items-center w-full h-full bg-base-300 rounded-xl cursor-pointer hover:bg-primary/50 hover:text-primary">
                                                <Image size={35} />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageChange(e, index)}
                                                />
                                            </label>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="w-full flex flex-col gap-5 font-raleway">
                            <h1 className="text-primary font-bold text-5xl">
                                Edit Information
                            </h1>
                            <div className="flex flex-col items-start justify-start w-full gap-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        placeholder="title..."
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
                                        type="date"
                                        className="input input-bordered h-[8rem]"
                                        placeholder="Discount end..."
                                        min={minDate}
                                        value={endsIn}
                                        onChange={(e) => setEndsIn(e.target.value)}
                                    />
                                    <textarea
                                        className="input input-bordered py-5 h-[8rem]"
                                        placeholder="description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {sizes.map((size, index) => (
                                        <label
                                            key={index}
                                            className="flex flex-row gap-1 items-center"
                                        >
                                            <input
                                                type="checkbox"
                                                className="checkbox-primary"
                                                checked={selectedSizes.includes(size)}
                                                onChange={() => toggleSize(size)}
                                            />
                                            <p>{size}</p>
                                        </label>
                                    ))}
                                </div>
                                <button
                                    disabled={isLoadingModal}
                                    onClick={onSubmit}
                                    type="button"
                                    className={`font-bold px-4 py-2 text-primary border border-primary/50 rounded-lg hover:bg-primary/50 ${isLoadingModal ? 'opacity-50' : ''}`}
                                >
                                    {
                                        isLoadingModal ? <span className="loading loading-infinity loading-md"></span> : 'Edit'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
};
export default ModalEditProduct;