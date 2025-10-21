import React from 'react';
import UserLayoutClient from "./UserLayoutClient";
import { ProductProvider } from '../context/productContext';
const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ProductProvider>
            <UserLayoutClient>
                {children}
            </UserLayoutClient>
        </ProductProvider>

    );
}
export default layout;