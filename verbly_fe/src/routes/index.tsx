import { createBrowserRouter } from "react-router-dom";
import { correctionRoutes } from "./correction";
import { onboardingRoutes } from "./onboarding";
import { myRoutes } from "./my";

export const router = createBrowserRouter([...onboardingRoutes, ...correctionRoutes,...myRoutes]);
