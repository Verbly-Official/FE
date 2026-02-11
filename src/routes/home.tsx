import type { RouteObject } from "react-router-dom";

import Home_Korean from "../pages/Home/Home_Korean";
import Home_Native from "../pages/Home/Home_Native";
import Home_Notification from "../pages/Home/Home_Notification";
import Home_Profile from "../pages/Home/Home_Profile";
import Home_Search from "../pages/Home/Home_Search";

export const homeRoutes: RouteObject[] = [
  { path: "/home/korean", element: <Home_Korean /> },
  { path: "/home/native", element: <Home_Native /> },
  { path: "/home/notification", element: <Home_Notification /> },
  { path: "/home/profile", element: <Home_Profile /> },
  { path: "/home/search", element: <Home_Search /> },
];
