export interface cardProps {
    name: string;
    image: string;
    description: string;
    to: string;
    discount: number
};

export interface aboutCardProps {
    title: string;
    benefits: string[];
    isOdd: boolean;
};