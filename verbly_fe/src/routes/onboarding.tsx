import type { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Onboarding/LoginPage";
import SelectLangPage from "../pages/Onboarding/SelectLangPage";
import OAuthCallbackPage from "../pages/Onboarding/OAuthCallbackPage";

export const onboardingRoutes: RouteObject[] = [
  { path: "login", element: <LoginPage /> },
  { path: "login/select-language", element: <SelectLangPage /> },
  { path: "oauth/callback", element: <OAuthCallbackPage /> },
];
