import type { RouteObject } from "react-router-dom";
import My_Korean from "../pages/My/My_Korean";
import My_Foreigner from "../pages/My/My_Foreigner";
import Payment from "../pages/My/PaymentPage";
import EditProfile from "../pages/My/EditProfilePage";

export const myRoutes: RouteObject[] = [
  { path: "my-korean", element: <My_Korean /> },
  { path: "my-foreigner", element: <My_Foreigner /> },
  { path: "edit-profile", element: <EditProfile /> },
  { path: "my-korean/payment", element: <Payment /> },
];