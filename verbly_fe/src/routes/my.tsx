import type { RouteObject } from "react-router-dom";
import My_Korean from "../pages/My/My_Korean";
import My_Native from "../pages/My/My_Native";
import Payment from "../pages/My/PaymentPage";
import EditProfile from "../pages/My/EditProfilePage";

export const myRoutes: RouteObject[] = [
  { path: "my/korean", element: <My_Korean /> },
  { path: "my/native", element: <My_Native /> },
  { path: "editProfile", element: <EditProfile /> },
  { path: "my/korean/payment", element: <Payment /> },
];