"use client";
import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { links } from '@/data/headerData';
const Header = () => {
    return (
        <div className='flex justify-between top-0 sticky items-center py-4 px-20 bg-base-200/80 z-50
        border-b-[0.2px] border-primary/20 h-[6rem]'>
            <div>
                <Link href={'/'}>
                    <Image
                        src={'/logo.png'}
                        alt='logo'
                        width={70}
                        height={70}
                        className='rounded-full'
                    />
                </Link>
            </div>
            <div className='flex items-start justify-start gap-7'>
                {links.map((link, index) => (
                    <div key={index} className="relative group">
                        <span className="absolute right-0 -top-1 w-0 h-[2px] bg-base-content transition-all duration-300 group-hover:w-full"></span>

                        <button className='font-light primary relative z-10'>
                            {link.name}
                        </button>
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-base-content transition-all duration-300 group-hover:w-full"></span>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center gap-3'>
                <SignedOut>
                    <SignInButton mode='modal'>
                        <button className="btn bg-white/10 text-white rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                                fill="currentColor"
                            >
                                <desc>Clerk Streamline Icon</desc>
                                <title>Clerk</title>
                                <path d="m21.47 20.829 -2.881 -2.881a0.572 0.572 0 0 0 -0.7 -0.084 6.854 6.854 0 0 1 -7.081 0 0.576 0.576 0 0 0 -0.7 0.084l-2.881 2.881a0.576 0.576 0 0 0 -0.103 0.69 0.57 0.57 0 0 0 0.166 0.186 12 12 0 0 0 14.113 0 0.58 0.58 0 0 0 0.239 -0.423 0.576 0.576 0 0 0 -0.172 -0.453Zm0.002 -17.668 -2.88 2.88a0.569 0.569 0 0 1 -0.701 0.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0 -1.222 3.692 6.86 6.86 0 0 0 0.978 3.764 0.573 0.573 0 0 1 -0.083 0.699l-2.881 2.88a0.567 0.567 0 0 1 -0.864 -0.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637 -0.405 0.566 0.566 0 0 1 0.232 0.418 0.57 0.57 0 0 1 -0.168 0.448Zm-7.118 12.261a3.427 3.427 0 1 0 0 -6.854 3.427 3.427 0 0 0 0 6.854Z" />
                            </svg>
                            Login with Clerk
                        </button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <div className='flex items-center justify-center gap-3'>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: 'w-12 h-12',
                                },
                            }}
                        />
                        <div className="indicator">
                            <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                                <ShoppingBagIcon className="size-5" />
                                <span className="badge badge-sm badge-primary indicator-item rounded-3xl">0</span>
                            </div>
                        </div>
                    </div>
                </SignedIn>
                <div>
                    <ThemeSelector />
                </div>
            </div>
        </div>
    );
};
export default Header;