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
export const products = [
    {
        title: 'Adidas',
        price: 80.5,
        sizes: ['XS', 'SM', 'M', 'L', 'XL'],
        image: '/shoes/shoes1.png',
        available: 20,
        quantity: 30
    },
    {
        title: 'Puma',
        price: 70.0,
        sizes: ['S', 'M', 'L'],
        image: '/shoes/shoes2.png',
        available: 15,
        quantity: 25
    },
    {
        title: 'Nike',
        price: 95.0,
        sizes: ['M', 'L', 'XL'],
        image: '/shoes/shoes3.png',
        available: 10,
        quantity: 20
    }
];
export const orders = [
    {
        title: 'Adidas',
        price: 80.5,
        sizes: ['XS', 'SM', 'M', 'L', 'XL'],
        image: '/shoes/shoes1.png',
        user: 'Sophia Turner',
        profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800',
        available: 20,
        quantity: 30,
        deliverStatus: 'delivered',
    },
    {
        title: 'Puma',
        price: 70.0,
        sizes: ['S', 'M', 'L'],
        image: '/shoes/shoes2.png',
        user: 'Daniel Rivera',
        profilePic: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800',
        available: 15,
        quantity: 25,
        deliverStatus: 'process',

    },
    {
        title: 'Nike',
        price: 95.0,
        sizes: ['M', 'L', 'XL'],
        image: '/shoes/shoes3.png',
        user: 'Marcus Lee',
        profilePic: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800',
        available: 10,
        quantity: 20,
        deliverStatus: 'failed',
    }
];
export const reviews = [
    {
        product: 'Adidas',
        user: 'Sophia Turner',
        rate: 4.8,
        review: 'Really comfortable and stylish shoes! Perfect for running and daily wear.',
        profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        productImage: '/shoes/shoes1.png',
    },
    {
        product: 'Puma',
        user: 'Daniel Rivera',
        rate: 4.2,
        review: 'Good quality for the price. The fit is slightly tight but still great overall.',
        profilePic: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        productImage: '/shoes/shoes2.png',
    },
    {
        product: 'Nike',
        user: 'Marcus Lee',
        rate: 3.5,
        review: 'Looks great but not very durable. The sole started wearing out sooner than expected.',
        profilePic: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        productImage: '/shoes/shoes3.png',
    },
    {
        product: 'Adidas',
        user: 'Lily Chen',
        rate: 5.0,
        review: 'Absolutely love these! Lightweight, comfortable, and the design is amazing.',
        profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        productImage: '/shoes/shoes1.png',
    },
    {
        product: 'Puma',
        user: 'Ethan Brown',
        rate: 4.0,
        review: 'Solid performance sneakers. Good grip and comfort during workouts.',
        profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        productImage: '/shoes/shoes2.png',
    },
];
export const users = [
    {
        name: 'Sophia Turner',
        profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        email: 'sophia.turner@example.com',
        address: '123 Maple Street, Springfield, IL, 62704',
        status: true,
    },
    {
        name: 'Daniel Rivera',
        profilePic: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        email: 'daniel.rivera@example.com',
        address: '456 Oak Avenue, Austin, TX, 73301',
        status: false,
    },
    {
        name: 'Marcus Lee',
        profilePic: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        email: 'marcus.lee@example.com',
        address: '789 Pine Road, Seattle, WA, 98101',
        status: true,
    },
    {
        name: 'Lily Chen',
        profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        email: 'lily.chen@example.com',
        address: '321 Cedar Lane, San Francisco, CA, 94102',
        status: false,
    },
    {
        name: 'Ethan Brown',
        profilePic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        email: 'ethan.brown@example.com',
        address: '654 Birch Boulevard, Miami, FL, 33101',
        status: true,
    },
];