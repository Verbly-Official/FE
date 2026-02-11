// Review interface based on Swagger
export interface Review {
    reviewId: number; // Swagger 예시에는 없지만 일반적으로 필요함. 응답 예시에는 없지만 리스트 렌더링 시 키가 필요하므로 확인 필요. 
    // Swagger 예시:
    // {
    //   "reviewerName": "string",
    //   "nativeLang": "string",
    //   "imageUrl": "string",
    //   "rating": 0,
    //   "reviewContent": "string",
    //   "createdAt": "2026-02-11T15:48:08.830Z"
    // }
    // ID가 없다면 인덱스를 사용해야 할 수도 있음. 일단 Swagger 그대로 정의.
    reviewerName: string;
    nativeLang: string;
    imageUrl: string;
    rating: number;
    reviewContent: string;
    createdAt: string;
}

// Review Meta Interface
export interface ReviewMeta {
    reviewAverage: number;
    reviewCount: number;
    rankPercentage: number;
}

// Create Review Request
export interface CreateReviewRequest {
    rating: number;      // 1~5
    reviewContent: string;
}
