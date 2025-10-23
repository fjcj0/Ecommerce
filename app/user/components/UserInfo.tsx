import React from 'react';
import { ListOrdered, Store } from 'lucide-react';
const UserInfo = ({ totalOrders, totalPurchase }: { totalOrders: any, totalPurchase: any }) => {
    return (
        <div className='w-full bg-base-300 flex items-center justify-center p-3 rounded-xl'>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <ListOrdered className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-primary">{totalOrders}</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <Store className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Total Purchases</div>
                    <div className="stat-value text-secondary">{totalPurchase}</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;