import React from 'react';
import { ListOrdered, Store } from 'lucide-react';
const UserInfo = () => {
    return (
        <div className='w-full bg-base-300 flex items-center justify-center p-3 rounded-xl'>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <ListOrdered className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Total Orders</div>
                    <div className="stat-value text-primary">25.6K</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <Store className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Total Sales</div>
                    <div className="stat-value text-secondary">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;