import { createBrowserRouter } from "react-router-dom";
import { correctionRoutes } from "./correction";
import { onboardingRoutes } from "./onboarding";

export const router = createBrowserRouter([...onboardingRoutes, ...correctionRoutes]);
