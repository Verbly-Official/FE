import type { RouteObject } from 'react-router-dom';
import InboxPage from '../pages/Inbox/InboxPage';
import ProfilePage from '../pages/Inbox/ProfilePage';
import ReviewPage from '../pages/Inbox/ReviewPage';

export const inboxRoutes: RouteObject[] = [
    {
        path: '/inbox',
        element: <InboxPage />,
    },
    {
        path: '/inbox/profile/:id',
        element: <ProfilePage />,
    },
    {
        path: '/inbox/review/:id',
        element: <ReviewPage />,
    },
];
