import { LucideIcon } from "lucide-react";
export const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV != 'development' ? '' : 'http://localhost:3000';
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
export interface imagesStateProps {
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    image5: string | null;
}
export interface sizesStateProps {
    xs: boolean;
    s: boolean;
    m: boolean;
    l: boolean;
    xl: boolean;
}
export interface updateProductsProps {
    sizesChosen: boolean[];
    quantity: number;
    discount: number;
    title: string;
    price: number;
    endsIn: string;
    description: string;
}
export interface createProductProps {
    imagesAddedBase64: any;
    sizesChosen: sizesStateProps;
    quantity: number;
    discount: number;
    title: string;
    price: number;
    endsIn: string;
    description: string;
}
export interface MonthlySalesData {
    revenue: number;
    salesCount: number;
}
export interface MonthlySales {
    [key: string]: MonthlySalesData;
}
export type ChartType = 'bar' | 'line' | 'doughnut';
export interface SalesChartProps {
    monthlySales: MonthlySales;
    chartType?: ChartType;
}