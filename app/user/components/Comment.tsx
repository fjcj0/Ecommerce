"use client";
import useAuthStore from '@/store/authStore';
import useReviews from '@/store/reviewsStore';
import { Edit3Icon, SaveIcon, XIcon, Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
const Comment = ({ userReview, productId }: { userReview: any, productId: any }) => {
    const { user: authUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(userReview?.comment || '');
    const [rating, setRating] = useState(userReview?.rating || 0);
    const [tempRating, setTempRating] = useState(userReview?.rating || 0);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { deleteUserReview, updateOrCreateReview, isDeletingReview, isCreatingOrUpdatingReview } = useReviews();
    if (!authUser) return null;
    const handleSave = async () => {
        await updateOrCreateReview(productId, authUser.id, comment, rating);
        setIsEditing(false);
    };
    const handleCancel = () => {
        setComment(userReview?.comment || '');
        setRating(userReview?.rating || 0);
        setTempRating(userReview?.rating || 0);
        setIsEditing(false);
    };
    const handleDelete = () => {
        deleteUserReview(productId, authUser.id);
        setShowDeleteConfirm(false);
    };
    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        setTempRating(newRating);
    };
    const handleStarHover = (hoverRating: number) => {
        setTempRating(hoverRating);
    };
    const handleStarLeave = () => {
        setTempRating(rating);
    };
    const handleEditClick = () => {
        setIsEditing(true);
        setShowDeleteConfirm(false);
    };
    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };
    return (
        <div className="flex w-full items-start gap-5 px-10 pb-20 pt-9 rounded-xl bg-base-300 relative">
            {userReview || isEditing ? (
                <>
                    <div className='absolute top-3 right-3'>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button
                                    type='button'
                                    className='btn btn-circle btn-sm btn-success'
                                    onClick={handleSave}
                                    disabled={!comment.trim() || rating === 0}
                                >
                                    <SaveIcon size={16} />
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-circle btn-sm btn-error'
                                    onClick={handleCancel}
                                >
                                    <XIcon size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    type='button'
                                    className='btn btn-circle btn-sm btn-primary'
                                    onClick={handleEditClick}
                                >
                                    <Edit3Icon size={16} />
                                </button>
                                {userReview && (
                                    <button
                                        type='button'
                                        disabled={isDeletingReview}
                                        className={` ${isDeletingReview ? 'opacity-50' : ''} btn btn-circle btn-sm btn-error`}
                                        onClick={() => handleDelete()}
                                    >
                                        <Trash2Icon size={16} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    {showDeleteConfirm && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-xl">
                            <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-sm mx-4">
                                <h3 className="text-lg font-bold mb-2">Delete Review</h3>
                                <p className="mb-4">Are you sure you want to delete your review? This action cannot be undone.</p>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        className="btn btn-ghost"
                                        onClick={handleCancelDelete}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="w-[80px] h-[80px] flex-shrink-0 relative">
                        <img
                            src={`${userReview?.profilepicture || authUser?.profilepicture}?width=80`}
                            srcSet={`${userReview?.profilepicture || authUser?.profilepicture}?width=80 1x, ${userReview?.profilepicture || authUser?.profilepicture}?width=160 2x`}
                            crossOrigin="anonymous"
                            alt={userReview?.displayname || authUser?.displayname || "User avatar"}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-5 flex-1">
                        <h1 className="text-2xl font-bold font-raleway">
                            {userReview?.displayname || authUser?.displayname}
                        </h1>
                        {isEditing ? (
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your review..."
                                className="textarea textarea-bordered w-full h-24 font-raleway"
                                maxLength={500}
                            />
                        ) : (
                            <p className="font-raleway">"{userReview?.comment}"</p>
                        )}
                        <div className="flex items-center gap-3">
                            {isEditing ? (
                                <>
                                    <p className="text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm">
                                        {tempRating.toFixed(1)}
                                    </p>
                                    <div
                                        className="rating rating-md gap-3"
                                        onMouseLeave={handleStarLeave}
                                    >
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <input
                                                key={n}
                                                type="radio"
                                                name="rating-new"
                                                className="mask mask-star-2 bg-orange-400 cursor-pointer"
                                                aria-label={`${n} star`}
                                                checked={rating === n}
                                                onChange={() => setRating(n)}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-primary bg-primary/30 px-5 py-1 rounded-3xl text-sm">
                                        {userReview?.rating}
                                    </p>
                                    <div className="rating rating-md gap-3">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <input
                                                key={n}
                                                type="radio"
                                                name="rating-display"
                                                className="mask mask-star-2 bg-orange-400"
                                                aria-label={`${n} star`}
                                                checked={n === userReview?.rating}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        {isEditing && (
                            <div className="text-sm text-gray-500 text-right">
                                {comment.length}/500 characters
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className='w-full'>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Add your review</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="rating rating-md gap-3">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <input
                                        key={n}
                                        type="radio"
                                        name="rating-new"
                                        className="mask mask-star-2 bg-orange-400 cursor-pointer"
                                        aria-label={`${n} star`}
                                        checked={rating === n}
                                        onChange={() => setRating(n)}
                                    />
                                ))}
                            </div>
                            <span className="text-primary bg-primary/30 px-3 py-1 rounded-3xl text-sm">
                                {rating > 0 ? rating.toFixed(1) : '0.0'}
                            </span>
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts about this product..."
                            className="textarea textarea-bordered w-full h-32 font-raleway"
                            maxLength={500}
                        />
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                {comment.length}
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSave}
                                disabled={!comment.trim() || rating === 0 || isCreatingOrUpdatingReview}
                            >
                                {
                                    !isCreatingOrUpdatingReview ?
                                        'Submit Review' : <span className='loading loading-infinity loading-md'></span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Comment;