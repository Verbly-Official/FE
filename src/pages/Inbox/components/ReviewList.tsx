import React from 'react';
import { Avatar } from '../../../components/Avatar/Avatar';
import { StarRating } from '../../../components/Rating/StarRating';
import type { Review } from '../../../types/review';

interface ReviewListProps {
    reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    return (
        <div className="flex flex-col gap-4">
            {reviews.map((review, index) => (
                <div key={review.reviewId || index} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Avatar src={review.imageUrl} className="w-10 h-10" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">{review.reviewerName}</span>
                                    {/* Native Lang Badge or similar if needed. Currently not in design but in API */}
                                    <span className="text-xs text-gray-400">{review.nativeLang}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <StarRating rating={review.rating} readonly size={24} gap={8} />
                            <span className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {review.reviewContent}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
