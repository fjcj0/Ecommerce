import { LucideIcon } from "lucide-react";
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