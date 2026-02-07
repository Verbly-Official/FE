import type { RouteObject } from "react-router-dom";
import Correction_Main from "../pages/Correction/CorrectionMainPage";
import Correction_Write from "../pages/Correction/WriteCorrectionPage";
import Correction_NMain from "../pages/Correction/Native/CorrectionMainNativePage";
import Correction_NList from "../pages/Correction/Native/CorrectionListNativePage";

export const correctionRoutes: RouteObject[] = [
  { path: "/", element: <Correction_Main /> },

  { path: "correction", element: <Correction_Main /> },
  { path: "correction/write", element: <Correction_Write /> },
  { path: "correction/native", element: <Correction_NMain /> },
  { path: "correction/native/list", element: <Correction_NList /> },
];
