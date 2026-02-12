import type { RouteObject } from 'react-router-dom';
import ReviewPage from '../pages/Library/Review/ReviewPage';
import { ReviewResultPage } from '../pages/Library/Review/ReviewResultPage';

export const reviewRoutes: RouteObject[] = [
    {
        path: '/review',
        element: <ReviewPage />,
    },
    {
        path: '/review/result',
        element: <ReviewResultPage />,
    },
];
