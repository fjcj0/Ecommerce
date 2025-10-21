"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import useReviews from '@/store/reviewsStore';
const Page = () => {
    const { reviews, getReviews, isLoadingReviews, deleteReviews } = useReviews();
    const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    useEffect(() => {
        getReviews();
    }, []);
    const filteredReviews = useMemo(() => {
        if (!searchTerm) return reviews;
        const lowercasedSearch = searchTerm.toLowerCase();
        return reviews.filter((review: any) =>
            review.displayname?.toLowerCase().includes(lowercasedSearch) ||
            review.title?.toLowerCase().includes(lowercasedSearch) ||
            review.comment?.toLowerCase().includes(lowercasedSearch) ||
            review.rating?.toString().includes(searchTerm)
        );
    }, [reviews, searchTerm]);
    const paginatedReviews = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredReviews.slice(startIndex, endIndex);
    }, [filteredReviews, currentPage, itemsPerPage]);
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const handleReviewSelect = (reviewId: number) => {
        setSelectedReviews(prev => {
            if (prev.includes(reviewId)) {
                return prev.filter(id => id !== reviewId);
            } else {
                return [...prev, reviewId];
            }
        });
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedReviews([]);
        } else {
            const allReviewIds = paginatedReviews.map((review: any) => review.id);
            setSelectedReviews(allReviewIds);
        }
        setSelectAll(!selectAll);
    };
    useEffect(() => {
        if (paginatedReviews.length > 0 && selectedReviews.length === paginatedReviews.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedReviews, paginatedReviews.length]);
    const handleDeleteSelected = async () => {
        if (selectedReviews.length === 0) return;
        try {
            await deleteReviews(selectedReviews);
            setSelectedReviews([]);
            setSelectAll(false);
            await getReviews();
            if (paginatedReviews.length === selectedReviews.length && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        } catch (error) {
            console.log('Error deleting reviews:', error);
        }
    };
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setSelectedReviews([]);
            setSelectAll(false);
        }
    };
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
        setSelectedReviews([]);
        setSelectAll(false);
    };
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        return pages;
    };
    if (isLoadingReviews) {
        return (
            <div className='w-full h-[80%] flex items-center justify-center'>
                <span className='loading loading-infinity loading-md'></span>
            </div>
        );
    }
    if (!isLoadingReviews && (!reviews || reviews.length === 0)) {
        return (
            <div className='w-full h-[80%] flex items-center justify-center'>
                <h1 className='font-raleway text-primary font-bold md:text-4xl text-3xl'>
                    No reviews yet
                </h1>
            </div>
        );
    }
    return (
        <div className='p-3 font-poppins h-full flex flex-col items-start justify-start gap-5'>
            <div className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search by user, product, or comment..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                                setSelectedReviews([]);
                                setSelectAll(false);
                            }}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show:</span>
                        <select
                            className="select select-bordered select-sm"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-3'>
                    <button
                        type='button'
                        className={`btn btn-circle ${selectedReviews.length > 0 ? 'bg-primary/30 hover:bg-primary/50 hover:text-primary' : 'bg-primary/30 cursor-not-allowed'}`}
                        onClick={handleDeleteSelected}
                        disabled={selectedReviews.length === 0}
                    >
                        <Trash size={23} />
                    </button>
                </div>
            </div>
            {searchTerm && (
                <div className="text-sm text-gray-600">
                    Found {filteredReviews.length} review(s) matching "{searchTerm}"
                </div>
            )}
            <div className='w-full flex items-start justify-center'>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </label>
                                </th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Rate</th>
                                <th>Review</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedReviews.map((review: any) => (
                                <tr
                                    key={review.id}
                                    className={selectedReviews.includes(review.id) ? 'bg-primary/20' : ''}
                                >
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={selectedReviews.includes(review.id)}
                                                onChange={() => handleReviewSelect(review.id)}
                                            />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar sm:block hidden">
                                                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                                    <Image
                                                        src={review.profilepicture}
                                                        alt={review.displayname}
                                                        width={50}
                                                        height={50}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{review.displayname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar sm:block hidden">
                                                <Image src={review.image_url} alt={review.title} width={50} height={50} />
                                            </div>
                                            <div>
                                                <div className="font-bold">{review.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{review.rating.toFixed(1)}</td>
                                    <td colSpan={2}>
                                        <div className='max-h-20 overflow-y-auto'>
                                            {review.comment}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex items-center justify-between'>
                <div className="join flex">
                    <button
                        className="join-item btn btn-outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {getPageNumbers().map(page => (
                        <button
                            key={page}
                            className={`join-item btn btn-outline ${currentPage === page ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="join-item btn btn-outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Page;