import { cardDashboardProps, topProductProps } from '@/global.t';
import { LayoutDashboard, StoreIcon, ListOrderedIcon, CheckSquare, PlusSquare, Star, Package, Users, DollarSign } from 'lucide-react';
export const shoes = [
    {
        name: 'Nike',
        discount: 20.3,
        image: '/shoes/shoes1.png',
        description: 'Nike shoes combine style, comfort, and performance with lightweight materials, cushioned soles, and breathable design, ideal for running, sports, or everyday casual wear.',
    },
    {
        name: 'Adidas',
        discount: 15,
        image: '/shoes/shoes2.png',
        description: 'Adidas sneakers offer comfort, support, and modern design with flexible soles and breathable materials, making them perfect for workouts, walking, or casual daily activities.',
    },
    {
        name: 'Puma',
        discount: 10,
        image: '/shoes/shoes3.png',
        description: 'Puma shoes provide versatile style and comfort with durable soles, breathable fabrics, and cushioned design, suitable for sports, outdoor activities, or everyday casual wear.',
    }
];
export const links = [
    {
        name: "HOME",
        toSection: "home",
    },
    {
        name: "ABOUT",
        toSection: "about",
    },
    {
        name: "OUR WORK",
        toSection: "ourwork",
    },
    {
        name: "CONTACT",
        toSection: "contact",
    }
];
export const about = [
    {
        title: 'Comfort & Fit',
        benefits: [
            "Cushioned insoles for all-day comfort",
            "Ergonomic design that supports natural foot movement",
            "Multiple sizes and widths for the perfect fit",
        ],
    },
    {
        title: 'Style & Design',
        benefits: [
            "Trendy designs suitable for all occasions",
            "Variety of colors and patterns to match your style",
            "Collaboration with top designers for exclusive collections",
        ],
    },
    {
        title: 'Durability & Performance',
        benefits: [
            "High-quality materials built to last",
            "Slip-resistant soles for safety and stability",
            "Lightweight construction for better performance during activities",
        ],
    },
];
export const userLinks = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        to: '/user',
    },
    {
        name: 'Store',
        icon: StoreIcon,
        to: '/user/store',
    },
    {
        name: 'Orders',
        icon: ListOrderedIcon,
        to: '/user/orders',
    },
    {
        name: 'Checkouts',
        icon: CheckSquare,
        to: '/user/checkouts',
    },
];
export const adminLinks = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        to: '/admin',
    },
    {
        name: 'Products',
        icon: Package,
        to: '/admin/products',
    },
    {
        name: 'Add Product',
        icon: PlusSquare,
        to: '/admin/add-product',
    },
    {
        name: 'Orders',
        icon: ListOrderedIcon,
        to: '/admin/orders',
    },
    {
        name: 'Reviews',
        icon: Star,
        to: '/admin/reviews',
    },
    {
        name: 'Users',
        icon: Users,
        to: '/admin/users',
    }
];
export const cardsDashboard: cardDashboardProps[] = [
    {
        icon: DollarSign,
        title: "Total Sales",
        value: 45230,
        increase: 18.5,
        isMoney: true,
    },
    {
        icon: Package,
        title: "Total Products",
        value: 320,
        decrease: 5.2,
        isMoney: false,
    },
    {
        icon: Users,
        title: "Total Users",
        value: 540,
        isMoney: false,
    },
    {
        icon: ListOrderedIcon,
        title: "Total Orders",
        value: 1280,
        increase: 7.8,
        isMoney: false,
    },
];

export const topProducts: topProductProps[] = [
    {
        name: 'Nike',
        increase: 20.3,
        image: '/shoes/shoes1.png',
        sold: 1249
    },
    {
        name: 'Adidas',
        decrease: 15,
        image: '/shoes/shoes2.png',
        sold: 980
    },
    {
        name: 'Puma',
        increase: 10,
        image: '/shoes/shoes3.png',
        sold: 1120
    }
];