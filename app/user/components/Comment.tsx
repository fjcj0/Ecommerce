"use client";
import useAuthStore from '@/store/authStore';
import { useUser } from '@clerk/nextjs';
import { Edit3Icon } from 'lucide-react';
import React from 'react';
const Comment = () => {
    const { user } = useUser();
    const { user: authUser } = useAuthStore();
    if (!authUser) return null;
    return (
        <div className="flex w-full items-start gap-5 px-10 pb-20 pt-9 rounded-xl bg-base-300 relative">
            <div className='absolute top-3 right-3'>
                <button type='button' className='btn btn-circle'><Edit3Icon size={20} /></button>
            </div>
            <div className="w-[80px] h-[80px] flex-shrink-0 relative">
                <img
                    src={`${authUser?.profilepicture}?width=80`}
                    srcSet={`${authUser?.profilepicture}?width=80 1x, ${authUser?.profilepicture}?width=160 2x`}
                    crossOrigin="anonymous"
                    alt={authUser.profilepicture}
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-5">

                <h1 className="text-2xl font-bold font-raleway">{authUser.displayname}</h1>
                <p className="font-raleway">"These shoes are super comfortable and stylish!"</p>
                <div className="flex items-center gap-3">
                    <p className="text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm">4.5</p>
                    <div className="rating rating-md gap-3">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <input
                                key={n}
                                type="radio"
                                name="rating-5"
                                className="mask mask-star-2 bg-orange-400"
                                aria-label={`${n} star`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Comment;