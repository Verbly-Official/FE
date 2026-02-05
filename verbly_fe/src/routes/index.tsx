import { createBrowserRouter } from "react-router-dom";
import { correctionRoutes } from "./correction";
import { onboardingRoutes } from "./onboarding";
import { homeRoutes } from "./home";

export const router = createBrowserRouter([
  ...onboardingRoutes,
  ...correctionRoutes,
  ...homeRoutes,
]);
