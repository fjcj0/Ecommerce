import React from 'react';
import { products } from '@/data/data';
import ProductCard from './ProductCard';
const Products = () => {
    return (
        <div className='flex flex-col mb-2'>
            <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 mb-2'>
                {
                    products.map((product, index) => (
                        <ProductCard key={index} title={product.title} price={product.price} sizes={product.sizes} image={product.image} available={product.available} quantity={product.quantity} />
                    ))
                }
            </div>
            <div className='w-full flex items-center justify-center'>
                <div className="join">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn">Page 22</button>
                    <button className="join-item btn">»</button>
                </div>
            </div>
        </div>
    )
}
export default Products;