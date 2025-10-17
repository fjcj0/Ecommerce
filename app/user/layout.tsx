import React from 'react';
import UserLayoutClient from "./UserLayoutClient";
const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <UserLayoutClient>
            {children}
        </UserLayoutClient>
    );
}
export default layout;