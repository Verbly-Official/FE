import { createBrowserRouter } from "react-router-dom";
import { correctionRoutes } from "./correction";
import { onboardingRoutes } from "./onboarding";
import { homeRoutes } from "./home";
import { myRoutes } from "./my";
import { inboxRoutes } from "./inbox";
import { libraryRoutes } from "./library";

export const router = createBrowserRouter([
  ...onboardingRoutes,
  ...correctionRoutes,
  ...homeRoutes,
  ...myRoutes,
  ...inboxRoutes,
  ...libraryRoutes,
]);
