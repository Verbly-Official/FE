import instance from './axios';
import type {
    LibraryItem,
    LibraryItemDetail,
    PaginatedResponse,
    LibraryItemsParams,
    CreateLibraryItemRequest,
    CreateLibraryItemResponse,
    UpdateLibraryItemRequest,
    CreateExampleRequest
} from '../types/library';

// API Response wrapper type
interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

/**
 * GET /api/library/items
 * Fetch library items with optional filters and pagination
 */
export const getLibraryItems = async (
    params?: LibraryItemsParams
): Promise<PaginatedResponse<LibraryItem>> => {
    const response = await instance.get<ApiResponse<PaginatedResponse<LibraryItem>>>(
        '/api/library/items',
        { params }
    );
    return response.data.result;
};

/**
 * GET /api/library/items/{itemId}
 * Get detailed information about a specific library item
 */
export const getLibraryItemDetail = async (itemId: number): Promise<LibraryItemDetail> => {
    const response = await instance.get<ApiResponse<LibraryItemDetail>>(
        `/api/library/items/${itemId}`
    );
    return response.data.result;
};

/**
 * POST /api/library/items
 * Create a new library item
 * Returns: { id: number }
 */
export const createLibraryItem = async (
    data: CreateLibraryItemRequest
): Promise<CreateLibraryItemResponse> => {
    const response = await instance.post<ApiResponse<CreateLibraryItemResponse>>(
        '/api/library/items',
        data
    );
    return response.data.result;
};

/**
 * PATCH /api/library/items/{itemId}
 * Update an existing library item
 */
export const updateLibraryItem = async (
    itemId: number,
    data: UpdateLibraryItemRequest
): Promise<LibraryItem> => {
    const response = await instance.patch<ApiResponse<LibraryItem>>(
        `/api/library/items/${itemId}`,
        data
    );
    return response.data.result;
};

/**
 * DELETE /api/library/items/{itemId}
 * Delete a library item
 */
export const deleteLibraryItem = async (itemId: number): Promise<void> => {
    await instance.delete<ApiResponse<void>>(`/api/library/items/${itemId}`);
};

/**
 * POST /api/library/items/{itemId}/examples
 * Add an example to a library item
 */
export const addExample = async (
    itemId: number,
    data: CreateExampleRequest
): Promise<void> => {
    await instance.post<ApiResponse<void>>(
        `/api/library/items/${itemId}/examples`,
        data
    );
};

/**
 * DELETE /api/library/items/{itemId}/examples/{exampleId}
 * Delete an example from a library item
 */
export const deleteExample = async (
    itemId: number,
    exampleId: number
): Promise<void> => {
    await instance.delete<ApiResponse<void>>(
        `/api/library/items/${itemId}/examples/${exampleId}`
    );
};
