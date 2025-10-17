import ThemeSelector from '@/app/components/ThemeSelector';
import useSlideStore from '@/store/slideStore';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ShoppingBagIcon } from 'lucide-react';
import React from 'react';
import { XCircleIcon, List } from 'lucide-react';
const Header = () => {
    const { isSlideOpen, toggleSlide } = useSlideStore();
    return (
        <div className={`top-0 flex justify-between items-center px-5
             w-[96%] mx-auto my-3 rounded-full h-[5rem]  bg-primary/20
             `}>
            <div>
                <button type='button' className='btn btn-circle' onClick={toggleSlide}>
                    {isSlideOpen ? <XCircleIcon size={26} /> : <List size={26} />}
                </button>
            </div>
            <div className="flex items-center justify-center gap-3">
                <div>
                    <ThemeSelector />
                </div>
            </div>
        </div>
    );
}
export default Header;