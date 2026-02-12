// Library Item Types
export interface LibraryItem {
    id: number;
    phrase: string;
    meaningKo: string;
    meaningEn: string;
    starred: boolean;
    status: string;
    updatedAt: string;
}

// Source (출처) - from Swagger
export interface LibrarySource {
    id: number;
    postId: number;
    correctionId: number;
    feedbackId: number;
    correctionWordId: number;
    sentenceIndex: number;
    tokenStart: number;
    tokenEnd: number;
    originalSegment: string;
    suggestionSegment: string;
    sourceStatus: string;
    createdAt: string;
}

// Example (예문) - from Swagger
export interface LibraryExample {
    id: number;
    exampleEn: string;      // 영어 예문
    exampleKo: string;      // 한국어 해석
    source: string;         // AI / MANUAL / CORPUS
    createdAt: string;
}

export interface LibraryItemDetail extends LibraryItem {
    sources: LibrarySource[];
    examples: LibraryExample[];
    createdAt: string;
}

// Pagination
export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

// Request Parameters
export interface LibraryItemsParams {
    page?: number;
    size?: number;
    q?: string;          // search query (phrase 기준)
    starred?: boolean;   // filter by starred
}

export interface CreateLibraryItemRequest {
    phrase: string;
    meaningKo?: string;
    meaningEn?: string;
}

export interface UpdateLibraryItemRequest {
    starred?: boolean;   // 현재는 starred만 수정 가능
}

export interface CreateExampleRequest {
    exampleEn: string;      // 영어 예문 (필수)
    exampleKo?: string;     // 한국어 해석 (선택)
    source: 'AI' | 'MANUAL' | 'CORPUS';  // 예문 출처
}

// API Response for createLibraryItem
export interface CreateLibraryItemResponse {
    id: number;
}

