"use client";
import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from "react";
type SizesType = {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
};
type Product = {
    id: number;
    title: string;
    price: string | number;
    available: number;
    xs?: boolean;
    s?: boolean;
    m?: boolean;
    l?: boolean;
    xl?: boolean;
    quantity?: number;
    images?: string[];
};
type ProductContextType = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    filteredProducts: Product[];
    priceBetween: { min: number; max: number };
    setPriceBetween: React.Dispatch<
        React.SetStateAction<{ min: number; max: number }>
    >;
    selectedSizes: SizesType;
    setSelectedSizes: React.Dispatch<React.SetStateAction<SizesType>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    displayNotAvailable: boolean;
    setDisplayNotAvailable: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
    paginatedProducts: Product[];
    totalPages: number;
};
const ProductContext = createContext<ProductContextType | undefined>(undefined);
export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [priceBetween, setPriceBetween] = useState({ min: 0, max: 500 });
    const [selectedSizes, setSelectedSizes] = useState<SizesType>({
        XS: false,
        S: false,
        M: false,
        L: false,
        XL: false,
    });
    const [search, setSearch] = useState("");
    const [displayNotAvailable, setDisplayNotAvailable] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((p) => {
            const price = Number(p.price) || 0;
            const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
            const matchesPrice =
                price >= priceBetween.min && price <= priceBetween.max;
            const matchesAvailability = displayNotAvailable
                ? p.available <= 0
                : p.available > 0;
            const selectedSizeKeys = Object.keys(selectedSizes).filter(
                (key) => selectedSizes[key as keyof SizesType]
            );
            const matchesSize =
                selectedSizeKeys.length === 0 ||
                selectedSizeKeys.some(
                    (size) =>
                        p[size.toLowerCase() as keyof Product] === true
                );
            return matchesSearch && matchesPrice && matchesAvailability && matchesSize;
        });
    }, [products, priceBetween, selectedSizes, search, displayNotAvailable]);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage, itemsPerPage]);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);
    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                filteredProducts,
                priceBetween,
                setPriceBetween,
                selectedSizes,
                setSelectedSizes,
                search,
                setSearch,
                displayNotAvailable,
                setDisplayNotAvailable,
                // Pagination
                currentPage,
                setCurrentPage,
                itemsPerPage,
                paginatedProducts,
                totalPages,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context)
        throw new Error("useProduct must be used within a ProductProvider");
    return context;
};