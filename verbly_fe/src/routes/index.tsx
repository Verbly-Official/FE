import { createBrowserRouter } from "react-router-dom";
import { correctionRoutes } from "./correction";
import { onboardingRoutes } from "./onboarding";
import { homeRoutes } from "./home";
import { myRoutes } from "./my";

export const router = createBrowserRouter([
  ...onboardingRoutes,
  ...correctionRoutes,
  ...homeRoutes,
  ...myRoutes,
]);
