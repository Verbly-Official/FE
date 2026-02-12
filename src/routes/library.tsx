import type { RouteObject } from 'react-router-dom';
import LibraryPage from '../pages/Library/LibraryPage';
import WordDetailPage from '../pages/Library/WordDetailPage';

export const libraryRoutes: RouteObject[] = [
    {
        path: '/library',
        element: <LibraryPage />,
    },
    {
        path: '/library/:itemId',
        element: <WordDetailPage />,
    },
];
