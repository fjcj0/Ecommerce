import { productsProps } from '@/global.t';
import Image from 'next/image';
import React from 'react';
import { CheckCircle, XIcon } from 'lucide-react';
import Link from 'next/link';
const ProductCard = ({ id, title, price, sizes, image, available, quantity, is_visible }: productsProps & { id: number, is_visible: boolean }) => {
    if (!is_visible) return null;
    return (
        <div className="card w-full shadow-sm">
            <div className="relative w-full h-[15rem] rounded-t-xl bg-primary/30 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="bg-base-300 rounded-b-xl p-5 flex flex-col gap-3 h-full justify-center">
                <h2 className="card-title font-raleway font-bold text-primary">{title}</h2>

                <div className="flex flex-row md:flex-col items-start justify-between gap-3">
                    <p className="text-sm text-primary bg-primary/30 px-3 py-1 rounded-xl">${price}</p>
                    <p className="text-sm text-primary bg-primary/30 px-3 py-1 rounded-xl font-raleway">
                        {'Quantity: ' + quantity}
                    </p>
                </div>
                {available > 0 ? (
                    <div className="flex items-start justify-start self-start gap-1 font-raleway text-sm text-primary bg-primary/30 px-3 py-1 rounded-xl">
                        <CheckCircle size={20} />
                        <p>Available</p>
                    </div>
                ) : (
                    <div className="flex items-start justify-start self-start gap-1 text-sm text-primary bg-primary/30 px-3 py-1 rounded-xl">
                        <XIcon size={20} />
                        <p>Not available</p>
                    </div>
                )}
                <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-3 gap-3 mr-auto">
                    {sizes.map((size, index) => (
                        <div className="btn btn-circle cursor-default" key={index}>
                            {size}
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-start items-end mt-3 h-full">
                    <Link href={`/user/product/${id}`} className="btn btn-outline px-5 text-sm font-raleway">View</Link>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;