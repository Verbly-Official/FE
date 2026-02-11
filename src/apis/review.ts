import api from './axios';
import type { Review, ReviewMeta, CreateReviewRequest } from '../types/review';

interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

// 특정 사용자의 전체 리뷰 조회
export const getReviews = async (revieweeId: number): Promise<Review[]> => {
    const response = await api.get<ApiResponse<Review[]>>(`/reviews/${revieweeId}`);
    return response.data.result;
};

// 리뷰 작성
export const createReview = async (revieweeId: number, data: CreateReviewRequest): Promise<void> => {
    await api.post<ApiResponse<void>>(`/reviews/${revieweeId}`, data);
};

// 특정 사용자의 리뷰 메타 데이터 조회
export const getReviewMeta = async (revieweeId: number): Promise<ReviewMeta> => {
    const response = await api.get<ApiResponse<ReviewMeta>>(`/reviews/${revieweeId}/meta`);
    return response.data.result;
};
