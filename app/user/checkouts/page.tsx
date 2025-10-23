"use client";
import React, { useEffect, useState } from 'react';
import CheckOutCard from '@/app/user/components/CheckOutCard';
import Address from '../components/Address';
import useCheckoutStore from '@/store/checkOutStore';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';
import Link from 'next/link';
import useUserOrderStore from '@/store/userOrderStore';
interface CheckoutItem {
    id: number;
    user_id: number;
    shoe_id: number;
    quantity: number;
    sizes: {
        xs: boolean;
        s: boolean;
        m: boolean;
        l: boolean;
        xl: boolean;
    };
    shoes: {
        id: number;
        title: string;
        price: string;
        description: string;
        available: boolean;
        sizes: {
            xs: boolean;
            s: boolean;
            m: boolean;
            l: boolean;
            xl: boolean;
        };
        discount: string;
        ends_in: string;
        quantity: number;
        is_visible: boolean;
        created_at: string;
        updated_at: string;
        image_url: string;
    };
}
const CheckoutsPage = () => {
    const { checkouts, getUserCheckouts, isItemsCheckOutLoading, deleteCheckout } = useCheckoutStore();
    const { createOrder, isCreatingOrder } = useUserOrderStore();
    const { user } = useAuthStore();
    const [editableCheckouts, setEditableCheckouts] = useState<CheckoutItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        if (user?.id) {
            getUserCheckouts(Number(user.id));
        }
    }, [user?.id]);
    useEffect(() => {
        if (checkouts !== null && !isItemsCheckOutLoading) {
            setEditableCheckouts(checkouts || []);
            setIsInitialized(true);
        }
    }, [checkouts, isItemsCheckOutLoading]);
    const handleQuantityChange = (checkoutId: number, newQuantity: number) => {
        setEditableCheckouts(prev =>
            prev.map(checkout =>
                checkout.id === checkoutId
                    ? { ...checkout, quantity: newQuantity }
                    : checkout
            )
        );
    };
    const handleSizeChange = (checkoutId: number, size: string, selected: boolean) => {
        setEditableCheckouts(prev =>
            prev.map(checkout =>
                checkout.id === checkoutId
                    ? {
                        ...checkout,
                        sizes: {
                            ...checkout.sizes,
                            [size]: selected
                        }
                    }
                    : checkout
            )
        );
    };
    const handleRemoveItem = async (checkoutId: number) => {
        setEditableCheckouts(prev =>
            prev.filter(checkout => checkout.id !== checkoutId)
        );
        await deleteCheckout(checkoutId);
    };
    const calculateTotalPrice = () => {
        return editableCheckouts.reduce((total, checkout) => {
            const price = parseFloat(checkout.shoes.price);
            const discount = parseFloat(checkout.shoes.discount || '0');
            const discountedPrice = price * (1 - discount / 100);
            const selectedSizesCount = Object.values(checkout.sizes).filter(Boolean).length;
            return total + (discountedPrice * checkout.quantity * selectedSizesCount);
        }, 0);
    };
    const hasItemsWithoutSizes = () => {
        return editableCheckouts.some(checkout => {
            const selectedSizesCount = Object.values(checkout.sizes).filter(Boolean).length;
            return selectedSizesCount === 0;
        });
    };
    const handleOrder = async () => {
        if (hasItemsWithoutSizes()) {
            toast.error("Please select sizes for all items before placing your order.");
            return;
        }
        if (editableCheckouts.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        const formattedCheckouts = editableCheckouts.map((checkout) => ({
            checkout_id: checkout.id,
            user_id: checkout.user_id,
            shoe_id: checkout.shoe_id,
            quantity: checkout.quantity,
            xs: checkout.sizes.xs,
            s: checkout.sizes.s,
            m: checkout.sizes.m,
            l: checkout.sizes.l,
            xl: checkout.sizes.xl,
            final_price: parseFloat(checkout.shoes.price) *
                (1 - parseFloat(checkout.shoes.discount || "0") / 100) *
                checkout.quantity *
                Object.values(checkout.sizes).filter(Boolean).length,
        }));
        await createOrder(formattedCheckouts);
        if (user?.id) await getUserCheckouts(user?.id);
    };
    if (isItemsCheckOutLoading || !isInitialized) {
        return (
            <div className='w-full min-h-screen flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <span className='loading loading-infinity loading-lg text-primary'></span>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold font-raleway mb-2'>Loading Your Cart...</h2>
                        <p className='text-gray-500'>Fetching your checkout items...</p>
                    </div>
                </div>
            </div>
        );
    }
    if (editableCheckouts.length === 0) {
        return (
            <div className='p-3 max-w-6xl mx-auto min-h-screen'>
                <div className='text-center py-16'>
                    <div className='max-w-md mx-auto'>
                        <div className='text-6xl mb-4'>🛒</div>
                        <h2 className='text-2xl font-bold font-raleway mb-2'>Your cart is empty</h2>
                        <p className='text-gray-500 mb-6'>Add some items to your cart to see them here</p>
                        <Link
                            href={'/user/store'}
                            className='btn btn-primary font-raleway'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <Address />
            </div>
        );
    }
    return (
        <div className='p-3 w-full'>
            <div className='space-y-4'>
                {editableCheckouts.map((checkout) => (
                    <CheckOutCard
                        key={checkout.id}
                        id={checkout.id}
                        title={checkout.shoes.title}
                        image={checkout.shoes.image_url}
                        quantity={checkout.quantity}
                        sizes={checkout.sizes}
                        price={checkout.shoes.price}
                        discount={checkout.shoes.discount}
                        onQuantityChange={handleQuantityChange}
                        onSizeChange={handleSizeChange}
                        onRemove={handleRemoveItem}
                    />
                ))}
            </div>
            <div className='rounded-xl mb-3 sticky '>
                <button
                    type='button'
                    className={`btn btn-primary font-poppins ${hasItemsWithoutSizes() ? 'btn-disabled' : ''}`}
                    onClick={handleOrder}
                    disabled={hasItemsWithoutSizes() || isCreatingOrder}
                >
                    {
                        isCreatingOrder ?
                            'Creating Order...'
                            : ''
                    }
                    {hasItemsWithoutSizes()
                        ? 'Select Sizes First'
                        : `Place Order - $${calculateTotalPrice().toFixed(2)}`
                    }
                </button>
            </div>
            <Address />
        </div>
    );
};
export default CheckoutsPage;