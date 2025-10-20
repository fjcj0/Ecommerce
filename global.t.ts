import { LucideIcon } from "lucide-react";
export const baseUrl = 'http://localhost:3000';
export interface cardProps {
    name: string;
    image: string;
    description: string;
    to: string;
    discount: number;
}
export interface aboutCardProps {
    title: string;
    benefits: string[];
    isOdd: boolean;
}
export interface cardDashboardProps {
    icon: LucideIcon;
    title: string;
    value: number;
    decrease?: number;
    increase?: number;
    isMoney: boolean;
}
export interface topProductProps {
    name: string;
    increase?: number;
    decrease?: number;
    image: string;
    sold?: number;
}
export interface productsProps {
    title: string;
    price: number;
    sizes: string[];
    image: string;
    available: number;
    quantity: number;
}
export interface checkoutsProps {
    title: string;
    image: string;
    quantity: number;
    sizes: any[];
}
export interface userReviewsProps {
    isOdd: boolean;
    profilePicture: string;
    rating: number;
    review: string;
    user: string;
}
export interface userProps {
    id: number;
    email: string;
    displayname: string;
    profilepicture: string;
}
export interface topTenProductProps {
    shoe_id: number;
    product_name: string;
    image: string;
    total_quantity_sold: number;
    total_revenue: number;
    increase?: number;
    decrease?: number;
}
export interface adminDashboardInformationProps {
    sumOfSales: number;
    totalProducts: number;
    totalUsers: number;
    totalOrders: number;
    totalOrdersDelivered: number;
    percentAgeOfOrders: number;
    topProducts: topTenProductProps[];
    productsPerMonth: any;
    salesPerMonth?: { month: string; total: number }[];
}